import type { JobResolved } from "./jobs/types";

export function serializeJobsForContext(jobs: JobResolved[]): string {
  return jobs
    .map(job => {
      const services = job.fields.relatedServices
        .map(s => `${s.fields.title}: ${s.fields.description}`)
        .join("\n  ");

      return [
        `## ${job.fields.title}`,
        `Location: ${job.fields.location}`,
        services ? `Services:\n  ${services}` : null,
        job.fields.descriptions ? `Description:\n  ${job.fields.descriptions}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n---\n\n");
}

export const SYSTEM_PROMPT = (context: string) => `\
You are an assistant for Tallboy Landscapes, a professional landscaping company in New Zealand.
You may ONLY answer questions using the job data provided below. Do not use any outside knowledge.
If a question cannot be answered from this data, say "I don't have that information" — do not guess or infer.
Keep answers concise and natural.

# Completed Jobs

${context}`;
