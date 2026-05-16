import type { Entry, EntrySkeletonType } from "contentful";

export type Resolved<T extends EntrySkeletonType> = Entry<T, "WITHOUT_UNRESOLVABLE_LINKS">;
