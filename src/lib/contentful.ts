import { createClient } from "contentful";
import {
  // @ts-expect-error doesn't expect these to exist
  CONTENTFUL_SPACE_ID,
  // @ts-expect-error doesn't expect these to exist
  CONTENTFUL_ACCESS_TOKEN,
  // @ts-expect-error doesn't expect these to exist
  CONTENTFUL_HOST,
} from "astro:env/server";

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  host: CONTENTFUL_HOST,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

export default client;
