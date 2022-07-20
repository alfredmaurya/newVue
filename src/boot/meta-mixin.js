export default ({ Vue }) => {
  Vue.mixin({
    data: function () {
      return {
        pageTitle: '',
      }
    },
    meta() {
      let currentRoute = this.$router ? this.$router.currentRoute : null

      if (currentRoute && currentRoute.meta && currentRoute.meta.pageTitle)
        this.pageTitle = currentRoute.meta.pageTitle

      return {
        title: this.pageTitle,
        titleTemplate: (title) => `${title ? `${title}  - ` : ''}  Blue Book`,
      }
    },
    watch: {
      $route(routeTo, routeFrom) {
        if (routeTo && routeTo.meta && routeTo.meta.pageTitle)
          this.pageTitle = routeTo.meta.pageTitle
      },
    },
  })
}
