import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { Resolved } from "../types";

export interface JobSkeleton extends EntrySkeletonType {
  contentTypeId: "Job";
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    location: EntryFieldTypes.Symbol;
    isHomepageJob: EntryFieldTypes.Boolean;
    showcaseImage: EntryFieldTypes.AssetLink;
    descriptions: EntryFieldTypes.Text;
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    beforeafterImages: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
}

export type JobResolved = Resolved<JobSkeleton>;
