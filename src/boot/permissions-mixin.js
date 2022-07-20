import { mapGetters } from 'vuex'

export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      ...mapGetters('auth', ['hasAnyPermission', 'hasPermission']),
    },
  })
}
