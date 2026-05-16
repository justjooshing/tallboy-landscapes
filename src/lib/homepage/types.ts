import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { Resolved } from "../types";

export interface HomePageSkeleton extends EntrySkeletonType {
  contentTypeId: "homePageContent";
  fields: {
    heroImage: EntryFieldTypes.AssetLink;
    heroTitle: EntryFieldTypes.Symbol;
    heroSubtitle: EntryFieldTypes.Symbol;
    aboutTitle: EntryFieldTypes.Symbol;
    aboutDescription: EntryFieldTypes.Text;
    featuredJobsTitle: EntryFieldTypes.Symbol;
    servicesTitle: EntryFieldTypes.Symbol;
    testimonialTitle: EntryFieldTypes.Symbol;
  };
}

export type HomePageResolved = Resolved<HomePageSkeleton>;
