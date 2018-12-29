const pkg = require('./package')
const axios = require('axios')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Open+Sans'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3590e4'},

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-4765c.firebaseio.com',
    credentials: false
  },

  transition: {
    name:'fade',
    mode:'out-in'
  },

  env:{
    fbAPIKey: 'AIzaSyBkKEDxpa99BzfRyixkLheHu-Ig2uqH8G4'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

  generate: {
    routes: function() {
     return axios.get('https://nuxt-blog-4765c.firebaseio.com/posts.json')
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push({route: '/posts/' + key, payload:{postData: res.data[key]}})
          }
          return routes
        })
    }
  }

}
