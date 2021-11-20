<template>
  <v-row>
    <v-col cols="12" md="6" class="px-md-16">
      <v-card dark elevation="6" rounded="lg" class="pa-2">
        <v-card-title>
          <span class="dot red lighten-1" />
          <span class="dot yellow" />
          <span class="dot green" />
        </v-card-title>
        <v-card-text class="text-large mt-4">
          <p>
            <span>Last login: </span>
            <span>{{ date }}</span>
          </p>
          <p>
            <span class="green--text text--accent-3">davide-cattani$ </span>
            <span>whoami</span>
          </p>
          <p>
            <span />
            <span class="font-weight-medium">Web Developer</span>
          </p>
          <p>
            <span class="green--text text--accent-3">davide-cattani$ </span>
            <span>ls -workplace</span>
          </p>
          <p>
            <span>> </span>
            <a
              href="https://www.studioilgranello.it"
              class="text--white font-weight-medium"
            >
              Studio il Granello
            </a>
            <!-- <span> &#60;</span> -->
          </p>
          <p>
            <span class="green--text text--accent-3">davide-cattani$ </span>
            <span>avatar -hover</span>
          </p>
          <p>
            <span>> </span>
            <v-tooltip top content-class="full-opacity pa-0">
              <template #activator="{ on, attrs }">
                <span
                  class="font-weight-medium hover-pointer"
                  v-bind="attrs"
                  v-on="on"
                >
                  photo.jpg
                </span>
              </template>
              <v-img
                max-height="180"
                max-width="180"
                :src="'/avatar.jpg'"
                class="mx-auto"
              />
            </v-tooltip>
            <!-- <span> &#60;</span> -->
          </p>
          <p>
            <span class="green--text text--accent-3">davide-cattani$ </span>
            <span v-show="input">|</span>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" class="px-8">
      <h2 class="mb-4">My blog:</h2>
      <template>
        <article v-for="post in posts" :key="post.slug" class="article-item mb-6">
          <nuxt-link :to="post.slug">
            <h3>{{ post.title }}</h3>
            <article-tags :tags="post.tags" />
            <p class="text-small">{{ post.description }}</p>
          </nuxt-link>
        </article>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import ArticleTags from '@/components/ArticleTags.vue'

export default {
  components: { ArticleTags },
  async asyncData ({ $content }) {
    const last = await $content('blog')
      .sortBy('date', 'desc')
      .only(['date'])
      .limit(1)
      .fetch()
    const rawDate = new Date(last[0].date)
    const dateOptions = { dateStyle: 'long', timeStyle: 'short' }
    const dateFormatter = new Intl.DateTimeFormat('en', dateOptions)
    const date = dateFormatter.format(rawDate)

    const posts = await $content('blog').sortBy('date', 'desc').fetch()

    return {
      date,
      posts
    }
  },
  data () {
    return {
      input: true
    }
  },
  head () {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  },
  mounted () {
    this.onSwitchInput()
  },
  methods: {
    onSwitchInput () {
      setTimeout(() => {
        this.input = !this.input
        this.onSwitchInput()
      }, 500)
    }
  }
}
</script>

<style scoped>
.dot {
  height: 22px;
  width: 22px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 12px;
}
</style>
