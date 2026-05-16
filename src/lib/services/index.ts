import client from "../contentful";
import type { ServiceResolved, ServiceSkeleton } from "./types";
import type { Resolved } from "../types";

export const withNormalisedTitle = (service: Resolved<ServiceSkeleton>): ServiceResolved => ({
  ...service,
  normalisedTitle: service.fields.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, "and")
});

export async function getServices(): Promise<ServiceResolved[] | null> {
  try {
    const entries = await client.getEntries<ServiceSkeleton>({
      content_type: "service",
    });
    return entries.items.map(withNormalisedTitle);
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
}

export async function getServiceById(id: string): Promise<ServiceResolved | null> {
  try {
    const entries = await client.getEntries<ServiceSkeleton>({
      content_type: "service",
      "sys.id": id,
      limit: 1,
    });
    return entries.items[0] ? withNormalisedTitle(entries.items[0]) : null;
  } catch (error) {
    console.error(`Error fetching service with id ${id}:`, error);
    return null;
  }
}
