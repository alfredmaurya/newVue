import { mapGetters } from 'vuex'

export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      ...mapGetters('showcase', ['getDialogProperties', 'getDialogState']),
    },
    methods: {
      updateDialogState({
        dialog = '',
        val = false,
        parentDialog = '',
        properties = null,
        refresh = false,
      }) {
        if (dialog) {
          this.$store.commit('showcase/updateDialogState', {
            dialog,
            val: !!val,
            parentDialog,
          })

          if (properties)
            this.$store.commit('showcase/SET_DIALOG_PROPERTIES', {
              dialog,
              properties,
              refresh,
            })
        }
      },
      deleteDialogProperties(dialog = '') {
        if (dialog)
          this.$store.commit('showcase/DELETE_DIALOG_PROPERTIES', dialog)
      },
    },
  })
}
