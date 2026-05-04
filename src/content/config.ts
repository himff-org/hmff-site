import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const programs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/programs" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    body: z.string(),
    audience: z.enum(["vendor", "donor", "both"]),
    icon: z.enum(["kit", "rally", "advocacy", "story"]),
    meta: z.string().optional(),
    cta: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
});

const voices = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/voices" }),
  schema: z.object({
    order: z.number(),
    quote: z.string(),
    attribution: z.string(),
    island: z.string(),
    truck: z.string().optional(),
  }),
});

export const collections = { programs, voices };
