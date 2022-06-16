<template>
  <v-card color="cyan darken-2" class="white--text">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs7>
          <div>
            <div class="headline">{{user.username}}</div>
            <div>Penso logo existo</div>
          </div>
        </v-flex>
        <v-flex xs5>
          <v-avatar
            size="125"
            color="grey ligthen-4"
          >
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg'>
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
