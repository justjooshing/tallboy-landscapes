import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { Resolved } from "../types";
import type { ServiceSkeleton, ServiceResolved } from "../services/types";

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
    // Reference to service(s) this job showcases
    relatedServices: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ServiceSkeleton>>;
  };
}

export type JobResolved = Omit<Resolved<JobSkeleton>, 'fields'> & {
  fields: Omit<Resolved<JobSkeleton>['fields'], 'relatedServices'> & {
    relatedServices: ServiceResolved[];
  }
};
