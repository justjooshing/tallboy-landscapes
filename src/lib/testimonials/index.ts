import client from "../contentful";
import type { TestimonialResolved, TestimonialSkeleton } from "./types";

export async function getTestimonials(): Promise<TestimonialResolved[]> {
  try {
    const entries = await client.getEntries<TestimonialSkeleton>({
      content_type: "testimonial",
    });
    return entries.items
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
