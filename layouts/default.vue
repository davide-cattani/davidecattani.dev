<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar fixed color="transparent" elevation="0" app>
      <v-btn
        text
        fab
        nuxt
        :to="'/'"
        exact
        active-class="no-active"
        exact-active-class="no-active"
      >
        <v-icon>mdi-code-json</v-icon>
      </v-btn>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-spacer />

      <v-btn text fab small link href="https://github.com/davide-cattani">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn text fab small link href="https://www.linkedin.com/in/davide-cattani/">
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span class="mx-auto text-small">&copy; {{ new Date().getFullYear() }} - made with
        <a href="https://nuxtjs.org/">nuxt.js</a></span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ]
    }
  }
}
</script>
