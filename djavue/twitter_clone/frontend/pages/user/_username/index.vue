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
    const username = context.params.username;
    return Promise.all([
      AppApi.get_user_details(username),
      AppApi.list_tweets(username)
    ]).then(result => {
      return {
        user: result[0].data,
        tweets: result[1].data
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
