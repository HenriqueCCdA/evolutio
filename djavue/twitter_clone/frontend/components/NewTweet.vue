<template>
  <div>
    <v-btn color="info" block v-if="logged_user" @click="gotweet()">Novo Tweet</v-btn>
    <textarea-dialog ref="newtweetdialog"></textarea-dialog>
  </div>
</template>

<script>

import textareaDialog from '~/components/TextareaDialog.vue'
import AppApi from '~apijs';

export default {
  components: {
    textareaDialog
  },
  data () {
    return {}
  },
  computed: {
    logged_user(){
        return this.$store.getters.logged_user;
    }
  },
  methods: {
    gotweet() {
        this.$refs.newtweetdialog.open({
            title: 'Novo tweet',
            label: 'Diga alguma coisa',
            value: '',
            action: 'Enviar',
            actionFunc: value => {
                return AppApi.tweet(value).then(tweet => {
                    this.$emit('newtweet', tweet)
                });
            }
        })
    }
  }
}
</script>

<style>
</style>