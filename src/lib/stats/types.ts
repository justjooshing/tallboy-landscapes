import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { Resolved } from "../types";

export interface StatSkeleton extends EntrySkeletonType {
  contentTypeId: "stats";
  fields: {
    value: EntryFieldTypes.Symbol;
    label: EntryFieldTypes.Symbol;
  };
}

export type StatResolved = Resolved<StatSkeleton>;
