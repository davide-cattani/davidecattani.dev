import colors from 'vuetify/es5/util/colors'
import en from './lang/en.json'
import it from './lang/it.json'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head () {
    const i18nHead = this.$nuxtI18nHead ? this.$nuxtI18nHead({ addSeoAttributes: true }) : { htmlAttrs: [], meta: [], link: [] }
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      title: 'Davide Cattani | Web Developer',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Hi! I\'m Davide'
        },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        ...i18nHead.meta
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
        ...i18nHead.link
      ]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-webfontloader',
    '@nuxtjs/i18n'
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  webfontloader: {
    google: {
      // families: ['Noto Sans Mono:400,700'] // Loads Lato font with weights 400 and 700
    }
  },

  i18n: {
    locales: [
      {
        code: 'it',
        iso: 'it-IT'
      },
      {
        code: 'en',
        iso: 'en-US'
      }
    ],
    baseUrl: 'https://www.davidecattani.dev',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: { en, it }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Noto Sans Mono',
        size: '18'
      }
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          anchor: 'unset'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true
    }
  }
}
