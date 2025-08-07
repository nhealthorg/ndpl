const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = ONE_DAY * 7;

export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxt/telemetry',
    '@nuxt/ui'
  ],
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    cookieName: "__session",
    cookieSecret: "secret",
    cookieExpires: ONE_DAY.toString(),
    cookieRememberMeExpires: ONE_WEEK.toString(),
    admin: {
      email: process.env.ADMIN_USER_EMAIL || '',
      password: process.env.ADMIN_USER_PASSWORD || ''
    }
  },
  database: {
    forceLatestMigration: false
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false
  },
  nitro: {
  },
})