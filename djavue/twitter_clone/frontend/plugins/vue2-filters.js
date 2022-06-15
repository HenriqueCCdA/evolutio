import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import moment from 'moment'

moment.locale('pt-br');

Vue.use(Vue2Filters)

Vue.filter('json', value => {
  if (!value) return
  return JSON.stringify(value, null, 2)
})

Vue.filter('timeago', value => {
  return moment(value).fromNow();
})