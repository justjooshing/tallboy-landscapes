import { createClient } from "contentful";
// @ts-expect-error doesn't expect these to exist
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from "astro:env/server";

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

export default client;
