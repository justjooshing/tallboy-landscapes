import client from "../contentful";
import { mockStats } from "./mocks";

export async function getStats() {
  try {
    const entries = await client.getEntries({
      content_type: "stats",
    });
    return entries.items.length
      ? (entries.items as unknown as StatResolved[])
      : mockStats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return mockStats;
  }
}
