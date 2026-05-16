import client from "../contentful";
import type { JobResolved, JobSkeleton } from "./types";

export async function getHeroJobs(): Promise<JobResolved[]> {
  try {
    const entries = await client.getEntries<JobSkeleton>({
      content_type: "Job",
      "fields.isHomepageJob": true,
      limit: 3,
    });
    return entries.items;
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
    return entries.items[0] ?? null;
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
    return entries.items;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
