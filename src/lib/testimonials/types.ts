import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { Resolved } from "../types";

export interface TestimonialSkeleton extends EntrySkeletonType {
  contentTypeId: "testimonial";
  fields: {
    name: EntryFieldTypes.Symbol;
    feedback: EntryFieldTypes.Text;
    role: EntryFieldTypes.Symbol;
  };
}

export type TestimonialResolved = Resolved<TestimonialSkeleton>;
