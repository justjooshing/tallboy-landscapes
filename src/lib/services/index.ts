import client from "../contentful";
import type { ServiceResolved, ServiceSkeleton } from "./types";

export async function getServices(): Promise<ServiceResolved[] | null> {
  try {
    const entries = await client.getEntries<ServiceSkeleton>({
      content_type: "service",
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
}
