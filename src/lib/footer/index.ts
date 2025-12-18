import client from "../contentful";
import { mockFooter } from "./mocks";
import { FooterResolved } from "./types";

export async function getFooterContent(): Promise<FooterResolved> {
  try {
    const entries = await client.getEntries({
      content_type: "contactInfo",
      limit: 1,
    });
    return entries.items.length
      ? (entries.items[0] as unknown as FooterResolved)
      : mockFooter;
  } catch (error) {
    console.error("Error fetching footer content:", error);
    return mockFooter;
  }
}
