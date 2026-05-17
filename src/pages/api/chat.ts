export const prerender = false;

// @ts-expect-error astro:env types not recognised outside .astro files
import { GEMINI_API_KEY } from "astro:env/server";
import { getJobs, getJobBySlug } from "../../lib/jobs/index";
import { serializeJobsForContext, SYSTEM_PROMPT } from "../../lib/agent";
import type { APIRoute } from "astro";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  slug?: string;
}

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent";

// Module-level cache — persists for the Worker instance lifetime.
const replyCache = new Map<string, string>();

async function callGemini(context: string, message: string, history: ChatMessage[]): Promise<string> {
  const contents = [
    ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    { role: "user", parts: [{ text: message }] },
  ];

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT(context) }] },
      contents,
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Gemini error:", err);
    throw new Error("Gemini unavailable");
  }

  const data = await res.json() as {
    candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
  };

  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";
}

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ok: true }), { status: 200 });

export const POST: APIRoute = async ({ request }) => {
  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { message, history = [], slug } = body;
  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: "Message required" }), { status: 400 });
  }

  // Cache only single-turn requests (no history); multi-turn is too context-dependent
  const cacheKey = history.length === 0
    ? `${slug ?? "all"}:${message.trim().toLowerCase()}`
    : null;

  if (cacheKey && replyCache.has(cacheKey)) {
    return new Response(JSON.stringify({ reply: replyCache.get(cacheKey) }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const job = slug ? await getJobBySlug(slug) : null;
  const jobs = job ? [job] : await getJobs();
  const context = serializeJobsForContext(jobs);

  let reply: string;
  try {
    reply = await callGemini(context, message, history);
  } catch {
    return new Response(JSON.stringify({ error: "AI service unavailable" }), { status: 502 });
  }

  if (cacheKey) replyCache.set(cacheKey, reply);

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
