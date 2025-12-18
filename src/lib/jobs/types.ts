import { Asset } from "../types";

export interface JobResolved {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    location: string;
    showcaseImage?: Asset;
    descriptions: string;
    images: Asset[];
  };
}
