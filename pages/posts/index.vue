<template>
  <div class="posts-page">
    <section class="post-list">
      <PostList :posts="loadedPosts"/>
    </section>
  </div>
</template>

<script>
  export default {
    middleware: 'log',
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>

<style scoped>

</style>
