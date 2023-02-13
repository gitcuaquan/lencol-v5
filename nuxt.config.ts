// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: "/lib/js/bootstrap.bundle.min.js" }],
      link: [{ rel: "stylesheet", href: "lib/css/bootstrap.min.css" }],
    },
  },
  build: {
    extend(config, ctx) {
      config.resolve.symlinks = false;
    },
  },
});
