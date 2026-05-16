import client from "../contentful";
import type { HomePageResolved, HomePageSkeleton } from "./types";

export async function getHomePageContent(): Promise<HomePageResolved | null> {
  try {
    const entries = await client.getEntries<HomePageSkeleton>({
      content_type: "homePageContent",
      limit: 1,
    });
    return entries.items[0] ?? null;
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return null;
  }
}
