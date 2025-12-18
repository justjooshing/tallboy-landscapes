import client from "../contentful";
import { TestimonialResolved } from "./types";

export async function getTestimonials(): Promise<TestimonialResolved[]> {
  try {
    const entries = await client.getEntries({
      content_type: "testimonial",
    });
    return entries.items as unknown as TestimonialResolved[];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
