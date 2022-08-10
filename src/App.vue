<template>
  <v-app >
    <NavBar />

    <v-main>
      <router-view />
    </v-main>
    <Footer_bar></Footer_bar>
  </v-app>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import NavBar from './components/nav/navBar.vue'
import Footer_bar from './components/FooterVue.vue';
  export default {
    name: 'App',
    components: {
    NavBar,
    Footer_bar
},

    data: () => ({
      //
    }),
    computed: {
      ...mapGetters({
        auth: 'auth/token'
      })
    },
    // created() {
    //   if (this.auth !== null) {
    //     this.$router.push({
    //       path: "/dashboard"
    //     })
    //   }else{
    //     this.$router.push({
    //       path: "/"
    //     })
    //   }
    // }
  };
</script>