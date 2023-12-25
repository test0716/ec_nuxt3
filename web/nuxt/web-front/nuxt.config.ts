// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: "src/",
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      strageUrl: "",
    },
  },
});
