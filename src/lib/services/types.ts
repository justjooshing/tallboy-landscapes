import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { Resolved } from "../types";

export interface ServiceSkeleton extends EntrySkeletonType {
  contentTypeId: "service";
  fields: {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    icon: EntryFieldTypes.Symbol;
  };
}

export type ServiceResolved = Resolved<ServiceSkeleton> & { normalisedTitle: string }
