<template>
  <v-card color="cyan darken-2" class="white--text">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs7>
          <div>
            <div class="headline">{{user.username}}</div>
            <div>{{user.last_tweet}}</div>
          </div>
        </v-flex>
        <v-flex xs5>
          <v-avatar
            size="125"
            color="grey ligthen-4"
          >
            <img :src="user.avatar">
          </v-avatar>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>

export default {
  props: ['user'],
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
