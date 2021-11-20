<template>
  <v-container class="article">
    <article>
      <h1 class="mb-2">{{ post.title }}</h1>
      <h3 class="font-italic mb-4">{{ date }}</h3>
      <article-tags :tags="post.tags" />
      <hr class="my-4" />
      <nuxt-content :document="post" />
    </article>
    <div class="mt-16 pt-16">
      <div class="mx-auto">
        <p>Was it useful?</p>
        <a class="blue--text" href="https://www.buymeacoffee.com/davidecattani">
          Buy me a coffee :)
        </a>
      </div>
    </div>
  </v-container>
</template>

<script>
import ArticleTags from '@/components/ArticleTags.vue'

export default {
  components: { ArticleTags },
  async asyncData ({ $content, params, i18n }) {
    const post = await $content('blog/' + params.slug).fetch()
    const date = new Date(post.date).toLocaleDateString(i18n.getBrowserLocale)
    return {
      post,
      date
    }
  },
  head () {
    return {
      title: 'Davide Cattani | ' + this.post.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
}
</style>
