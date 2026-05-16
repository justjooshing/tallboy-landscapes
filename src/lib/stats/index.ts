import client from "../contentful";
import type { StatResolved, StatSkeleton } from "./types";

export async function getStats(): Promise<StatResolved[] | null> {
  try {
    const entries = await client.getEntries<StatSkeleton>({
      content_type: "stats",
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}
