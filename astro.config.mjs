// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { loadEnv } from "vite";


const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  ""
);

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sanity({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
    useCdn: true,
    apiVersion: "2024-02-14",
  }), react()],
});