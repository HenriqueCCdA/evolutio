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
          <div v-if="logged_user">
            <v-btn v-if="!user.ifollow" :loading="loading" block color="success" @click="follow()">Seguir</v-btn>
            <v-btn v-if="user.ifollow" :loading="loading" block color="error" @click="unfollow()">Deixa de seguir</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>

import AppApi from '~apijs';

export default {
  props: ['user'],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    logged_user() {
      return this.$store.getters.logged_user
    }
  },
  methods: {
    follow(){
      this.loading = true;
      AppApi.follow(this.user.username).then(() => {
        this.user.ifollow = true;
        this.loading = false;
      });

    },
    unfollow(){
      this.loading = true
      AppApi.unfollow(this.user.username).then(() => {
        this.user.ifollow = false;
        this.loading = false;
      });
    }
  }
}
</script>

<style>
</style>
