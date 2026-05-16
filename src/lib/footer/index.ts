import client from "../contentful";
import type { FooterResolved, FooterSkeleton } from "./types";

export async function getFooterContent(): Promise<FooterResolved | null> {
  try {
    const entries = await client.getEntries<FooterSkeleton>({
      content_type: "contactInfo",
      limit: 1,
    });
    return entries.items[0] ?? null;
  } catch (error) {
    console.error("Error fetching footer content:", error);
    return null;
  }
}
