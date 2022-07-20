import { mapGetters } from 'vuex'

export default ({ ssrContext, Vue, store }) => {
  if (ssrContext && ssrContext.Q_BODY_CLASSES) {
    if (store.getters['persisted/currentThemeClass'] == 'body--light-white')
      ssrContext.Q_BODY_CLASSES =
        ssrContext.Q_BODY_CLASSES +
        ` ${store.getters['persisted/currentThemeClass']}`
  }

  Vue.mixin({
    computed: {
      ...mapGetters('persisted', [
        'currentTheme',
        'currentThemeClass',
        'currentThemeName',
        'isLoggedIn',
      ]),
      ...mapGetters('common', ['themeApplied']),
    },
    methods: {
      toggleTheme() {
        this.$store.commit('common/ADD_ANIMATION')
        this.$store.commit('persisted/TOGGLE_THEME')
        this.$store.commit('common/THEME_APPLIED', false)

        setTimeout(() => {
          this.applyThemeChanges()
          this.$store.commit('common/THEME_APPLIED', true)

          setTimeout(() => {
            this.$store.commit('common/REMOVE_ANIMATION')
          })
        }, 1000)
      },
      applyThemeChanges() {
        if (typeof document != 'undefined') {
          document.body.classList.remove(`body--light`)
          document.body.classList.remove(`body--dark`)
          document.body.classList.remove(`body--light-white`)
          this.$q.dark.set(false)
        }

        if (this.currentTheme && this.isLoggedIn) {
          let { currentThemeClass } = this

          if (
            currentThemeClass == 'body--light-white' &&
            typeof document != 'undefined'
          )
            document.body.classList.add(currentThemeClass)

          if (currentThemeClass == 'body--dark') this.$q.dark.set(true)
        }
      },
    },
  })
}
