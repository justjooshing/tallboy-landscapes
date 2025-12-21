import client from "../contentful";
import { FooterResolved } from "./types";

export async function getFooterContent(): Promise<FooterResolved | null> {
  try {
    const entries = await client.getEntries({
      content_type: "contactInfo",
      limit: 1,
    });
    return entries.items[0] as unknown as FooterResolved;
  } catch (error) {
    console.error("Error fetching footer content:", error);
    return null;
  }
}
