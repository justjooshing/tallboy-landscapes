import client from "../contentful";
import type { HomePageResolved } from "./types";

export async function getHomePageContent(): Promise<HomePageResolved | null> {
  try {
    const entries = await client.getEntries({
      content_type: "homePageContent",
      limit: 1,
    });
    return (entries.items[0] as unknown as HomePageResolved) || null;
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return null;
  }
}
