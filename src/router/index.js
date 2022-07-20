import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

import { setRouteName, resetObjRequests, setAxiosHeaders } from 'src/boot/axios'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })

  // Router.afterEach((routeTo, routeFrom) => {})

  Router.beforeEach(async (to, from, next) => {
    let allowedToEnter = true,
      isLoggedIn = store.getters['persisted/isLoggedIn']

    resetObjRequests()

    if (!from.name || from.name == 'Login') {
      isLoggedIn = store.getters['persisted/isLoggedIn']

      if (isLoggedIn) {
        let authToken = store.getters['persisted/authToken']
        setAxiosHeaders(authToken)
        await store.dispatch('auth/getCurrentEmployee')
      }
    } else {
      setRouteName(to.name)
    }

    to.matched.some((record) => {
      isLoggedIn = store.getters['persisted/isLoggedIn']

      if ('meta' in record) {
        if (
          'requiresAuth' in record.meta &&
          record.meta.requiresAuth &&
          !isLoggedIn
        ) {
          allowedToEnter = false
          next({
            name: 'Login',
            query: { redirectFrom: to.fullPath },
          })
        } else if (
          'permission' in record.meta &&
          record.meta.permission &&
          !store.getters['auth/hasPermission'](record.meta.permission) &&
          from.name != 'Homepage'
        ) {
          allowedToEnter = false
          next({
            name: 'Homepage',
          })
        }
      }
    })

    // if (to.matched.some((record) => record.meta.requiresAuth)) {
    //   if (!isLoggedIn) {
    //     allowedToEnter = false
    //     next({
    //       name: 'Login',
    //       query: { nextUrl: to.fullPath },
    //     })
    //   }
    // } else if (isLoggedIn) {
    //   allowedToEnter = false
    //   next({
    //     name: 'Homepage',
    //   })
    // }

    // go to the requested page
    if (allowedToEnter) next()
  })

  return Router
}
