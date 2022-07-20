import Vue from 'vue'
import Vuex from 'vuex'
import { Cookies } from 'quasar'
import createPersistedState from 'vuex-persistedstate'

import persisted from './persisted'
import showcase from './showcase'
import common from './common'
import auth from './auth'
import location from './location'
import customer from './customer'
import employee from './employee'
import parks from './parks'
import roles from './roles'
import facility from './facility'
import accommodation from './accommodation'
import accommodationType from './accommodation-type'
import bookings from './bookings'
import crud from './crud'
import tax from './tax'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function ({ ssrContext }) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies,
    options = { path: '/', expires: 1 },
    Store = new Vuex.Store({
      modules: {
        persisted,
        common,
        showcase,
        auth,
        location,
        employee,
        customer,
        parks,
        roles,
        facility,
        accommodation,
        accommodationType,
        bookings,
        crud,
        tax,
      },

      // enable strict mode (adds overhead!)
      // for dev mode only
      strict: process.env.DEBUGGING,
      plugins: [
        createPersistedState({
          key: 'BlueBookPersisted',
          paths: ['persisted'],
          storage: {
            getItem: (key) => JSON.stringify(cookies.get(key)),
            setItem: (key, value) => cookies.set(key, value, options),
            removeItem: (key) => cookies.remove(key),
          },
        }),
      ],
    })

  return Store
}
