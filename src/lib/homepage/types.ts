import type { Asset } from "../types";

export interface HomePageResolved {
  fields: {
    heroImage: Asset;
    heroTitle: string;
    heroSubtitle: string;
    aboutTitle: string;
    aboutDescription: string;
    featuredJobsTitle: string;
    servicesTitle: string;
    testimonialTitle: string;
  };
}
