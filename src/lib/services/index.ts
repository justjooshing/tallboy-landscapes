import client from "../contentful";
import type { ServiceResolved } from "./types";

export async function getServices(): Promise<ServiceResolved[] | null> {
  try {
    const entries = await client.getEntries({
      content_type: "service",
    });

    return entries.items as unknown as ServiceResolved[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
}
