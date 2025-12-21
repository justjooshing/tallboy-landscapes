import client from "../contentful";
import { StatResolved } from "./types";

export async function getStats(): Promise<StatResolved[] | null> {
  try {
    const entries = await client.getEntries({
      content_type: "stats",
    });
    return entries.items as unknown as StatResolved[];
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}
