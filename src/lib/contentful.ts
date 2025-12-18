import { createClient } from "contentful";

const CONTENTFUL_SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID || "";
const CONTENTFUL_ACCESS_TOKEN = import.meta.env.CONTENTFUL_ACCESS_TOKEN || "";

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

export default client;
