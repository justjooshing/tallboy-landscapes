export const prerender = false;

// @ts-expect-error astro:env types not recognised outside .astro files
import { GEMINI_API_KEY } from "astro:env/server";
import { getJobs } from "../../lib/jobs/index";
import { serializeJobsForContext, SYSTEM_PROMPT } from "../../lib/agent";
import type { APIRoute } from "astro";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent";

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ok: true }), { status: 200 });

export const POST: APIRoute = async ({ request }) => {
  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { message, history = [] } = body;
  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: "Message required" }), { status: 400 });
  }

  const jobs = await getJobs();
  const context = serializeJobsForContext(jobs);

  const contents = [
    ...history.map(m => ({
      role: m.role,
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const geminiRes = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT(context) }] },
      contents,
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    }),
  });

  if (!geminiRes.ok) {
    const err = await geminiRes.text();
    console.error("Gemini error:", err);
    return new Response(JSON.stringify({ error: "AI service unavailable" }), { status: 502 });
  }

  const data = await geminiRes.json() as {
    candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
  };

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
