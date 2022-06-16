<template>
  <div>
    <usercard :user="user"></usercard>
    <timeline :tweets="tweets"></timeline>
  </div>
</template>

<script>

import timeline from '~/components/Timeline.vue'
import usercard from '~/components/UserCard.vue'

export default {
  props: ['user', 'tweets'],
  components: {
    timeline, usercard
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
