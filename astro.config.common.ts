import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { imageService } from "@unpic/astro/service";
import sitemap from "@astrojs/sitemap";

interface ConfigProps {
  output: "static" | "server";
  site: string;
}

export const setupConfig = ({ output, site }: ConfigProps) =>
  defineConfig({
    site,
    output,
    integrations: [sitemap()],
    adapter: output === 'static' ? undefined : cloudflare({ imageService: "compile" }),
    image: {
      service: imageService({
        fallbackService: "contentful",
        placeholder: "blurhash",
      }),
    },
    env: {
      validateSecrets: true,
      schema: {
        PUBLIC_EMAILJS_SERVICE_ID: envField.string({
          context: "client",
          access: "public",
        }),
        PUBLIC_EMAILJS_TEMPLATE_ID: envField.string({
          context: "client",
          access: "public",
        }),
        PUBLIC_EMAILJS_PUBLIC_KEY: envField.string({
          context: "client",
          access: "public",
        }),
        CONTENTFUL_SPACE_ID: envField.string({
          context: "server",
          access: "secret",
        }),
        CONTENTFUL_ACCESS_TOKEN: envField.string({
          context: "server",
          access: "secret",
        }),
        CONTENTFUL_HOST: envField.string({
          context: "server",
          access: "public",
        }),
      },
    },
  });
