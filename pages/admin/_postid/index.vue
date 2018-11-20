
<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '@/components/Admin/AdminPostForm'

  export default {
    layout: 'admin',
    middleware:['check-auth','auth'],
    asyncData(context) {
      if (context.payload){
        return {
          loadedPost: context.payload.postData
        }
      }
      return context.app.$axios.$get('/posts/' + context.params.postid + '.json')
        .then(data => {

          return {
            loadedPost: { ...data,
              id: context.params.postid
            }
          }
        })
        .catch(e => context.error(e))
    },
    components: {
      AdminPostForm
    },
    methods: {
      onSubmitted(editedPost) {
        this.$store.dispatch('editPost', editedPost)
          .then(() => {
            this.$router.push('/admin')
          })

      }
    }
  }
</script>

<style scoped>
  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .update-form {
    width: 90%;
    margin: 20px auto;
  }

  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>
