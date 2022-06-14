<template>
  <div>
  <home :tweets="tweets"></home>
  <pre>{{logged_user}}</pre>
  </div>
</template>

<script>

import home from '~/components/Home.vue';

import AppApi from '~apijs';

export default {
  components: {
    home
  },
  asyncData(){
    console.log('asyncData');
    return AppApi.list_tweets().then( result => {
      console.log('asyncData RETURN');
      return {
        tweets: result.data
      }
    })
  },
  data () {
    return {
    }
  },
  computed: {
    logged_user (){
      return this.$store.getters.logged_user;
    }
  }
}
</script>

<style>
</style>
