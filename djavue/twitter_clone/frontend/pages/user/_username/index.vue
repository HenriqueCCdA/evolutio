<template>
  <viewuser :user="user" :tweets="tweets"></viewuser>
</template>

<script>

import viewuser from '~/components/ViewUser.vue';
import AppApi from '~apijs';

export default {
  components: {
    viewuser
  },
  asyncData(context) {
    debugger
    const username = context.params.username;
    console.log(username)
    return AppApi.list_tweets(username).then( result => {
      return {
        tweets: result.data,
        user:{
          username: username
        }
      }
    })
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
