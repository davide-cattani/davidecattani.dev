<template>
  <v-row>
    <v-col cols="12" md="6" class="px-md-16">
      <v-card dark elevation="6" rounded="lg" class="pa-2">
        <v-card-title>
          <span class="dot red lighten-1"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
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
            <span> </span>
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
              >Studio il Granello</a
            >
            <!-- <span> &#60;</span> -->
          </p>
          <p>
            <span class="green--text text--accent-3">davide-cattani$ </span>
            <span>avatar -hover</span>
          </p>
          <p>
            <span>> </span>
            <span
              class="font-weight-medium hover-pointer"
              @mouseover="pic = true"
              @mouseleave="pic = false"
              >photo.jpg</span
            >
            <!-- <span> &#60;</span> -->
          </p>
        </v-card-text>
      </v-card>
      <div v-if="pic" class="mt-16">
        <v-img
          max-height="160"
          max-width="160"
          :src="'/foto.jpg'"
          class="mx-auto"
        />
      </div>
    </v-col>
    <v-col cols="12" md="6" class="px-8">
      <h2 class="mb-4">My blog:</h2>
      <div class="">
        <article v-for="post in posts" :key="post.slug">
          <nuxt-link :to="post.slug">
            <h3>{{ post.title }}</h3>
            <p class="text-small">{{ post.description }}</p>
          </nuxt-link>
        </article>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
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
      pic: false
    }
  },
  head () {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
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
