import client from "../contentful";
import { withNormalisedTitle } from "../services";
import type { JobResolved, JobSkeleton } from "./types";
import type { Resolved } from "../types";

const withResolvedServices = (job: Resolved<JobSkeleton>): JobResolved => ({
  ...job,
  fields: {
    ...job.fields,
    relatedServices: (job.fields.relatedServices ?? [])
      .filter((service): service is Exclude<typeof service, undefined> => !!service)
      .map(withNormalisedTitle)
  }
});

export async function getHeroJobs(): Promise<JobResolved[]> {
  try {
    const entries = await client.getEntries<JobSkeleton>({
      content_type: "Job",
      "fields.isHomepageJob": true,
      limit: 3,
    });
    return entries.items.map(withResolvedServices);
  } catch (error) {
    console.error("Error fetching hero jobs:", error);
    return [];
  }
}

export async function getJobBySlug(slug: string): Promise<JobResolved | null> {
  try {
    const entries = await client.getEntries<JobSkeleton>({
      content_type: "Job",
      "fields.slug": slug,
      limit: 1,
    });
    return entries.items[0] ? withResolvedServices(entries.items[0]) : null;
  } catch (error) {
    console.error(`Error fetching job with slug ${slug}:`, error);
    return null;
  }
}

export async function getJobs(): Promise<JobResolved[]> {
  try {
    const entries = await client.getEntries<JobSkeleton>({
      content_type: "Job",
    });
    return entries.items.map(withResolvedServices);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobsByServiceId(serviceId: string): Promise<JobResolved[]> {
  try {
    const entries = await client.getEntries<JobSkeleton>({
      content_type: "Job",
      "fields.relatedServices.sys.id": serviceId,
    });
    return entries.items.map(withResolvedServices);
  } catch (error) {
    console.error(`Error fetching jobs for service id ${serviceId}:`, error);
    return [];
  }
}
