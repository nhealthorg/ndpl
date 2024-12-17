const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = ONE_DAY * 7;

export default defineNuxtConfig({
  compatibilityDate: "2024-12-10",
  modules: [
    '@nuxt/ui'
  ],
  devtools: {
    enabled: true
  },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    cookieName: "__session",
    cookieSecret: "secret",
    cookieExpires: ONE_DAY.toString(),
    cookieRememberMeExpires: ONE_WEEK.toString(),
  },
  css: ['~/assets/css/main.css']
})