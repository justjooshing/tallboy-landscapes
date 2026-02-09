import { setupConfig } from "./astro.config.common";
import sitemap from "@astrojs/sitemap";

export default setupConfig({
  output: "static",
  site: "https://www.tallboylandscapes.com",
  integrations: [sitemap()],
});
