// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/sanity"],

  ssr: false,
  sanity: {
    // projectId: "nt0745us",
    // dataset: "circo-app",
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    token: process.env.SANITY_STUDIO_TOKEN,
  },

  runtimeConfig: {
    public: {},
  },
});
