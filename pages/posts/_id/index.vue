<template>
  <div class="single-post-page">
    <section class="post">
          <div class="post-thumbnail" :style="{backgroundImage: 'url(' + loadedPost.thumbnail + ')'}">
      </div>
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <p class="post-detail">Last updated on {{loadedPost.updatedDate | date}}</p>
        <p class="post-detail">Written by: {{loadedPost.author}}</p>
      </div>
      <p class="post-content">{{loadedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think of this at <a href="mailto:support@blog.com">support@blog.com</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    asyncData(context) {
      return context.app.$axios.$get('/posts/' + context.params.id + '.json')
        .then(data => {
          return {
            loadedPost: data
          }
        })
        .catch(e => context.error(e))
    }
  }
</script>

<style>
  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .post {
    width: 100%;
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    margin: 0;
  }

  .post-thumbnail {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }
</style>
