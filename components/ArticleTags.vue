<template>
  <div class="tag-wrapper">
    <v-chip v-for="tag in tags" :key="tag" x-small label class="mr-2">
      {{ tag }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
