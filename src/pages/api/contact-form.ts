export const prerender = false;

import type { APIRoute } from "astro";
import { createMessage } from "@upyo/core";
import { SmtpTransport } from "@upyo/smtp";

const host = import.meta.env.SMTP_HOST;
const port = import.meta.env.SMTP_PORT;
const user = import.meta.env.SMTP_USER;
const pass = import.meta.env.SMTP_PASS;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const firstName = data.get("firstName")?.toString() || "";
  const lastName = data.get("lastName")?.toString() || "";
  const email = data.get("email")?.toString() || "";
  const phone = data.get("phone")?.toString() || "";
  const messageText = data.get("message")?.toString() || "";
  console.log("has posted", { firstName, lastName, email, phone, messageText });

  // Configure SMTP (production use your provider credentials)
  const transport = new SmtpTransport({
    host: host,
    port: Number(port),
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });

  // Build the message
  const message = createMessage({
    from: `${firstName} ${lastName} <${email}>`,
    to: user,
    subject: `New contact from ${firstName} ${lastName}`,
    content: {
      text: `Phone: ${phone}\n\n${messageText}`,
    },
  });

  try {
    const receipt = await transport.send(message);

    if (!receipt.successful) {
      return new Response(
        JSON.stringify({ success: false, errors: receipt.errorMessages }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
};
