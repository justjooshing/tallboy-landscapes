import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { Resolved } from "../types";

export interface FooterSkeleton extends EntrySkeletonType {
  contentTypeId: "contactInfo";
  fields: {
    contactFormTitle: EntryFieldTypes.Symbol;
    contactFormSubtitle: EntryFieldTypes.Symbol;
    contactEmail: EntryFieldTypes.Symbol;
    contactPhone: EntryFieldTypes.Symbol;
    hours: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    serviceAreas: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    companyName: EntryFieldTypes.Symbol;
  };
}

export type FooterResolved = Resolved<FooterSkeleton>;
