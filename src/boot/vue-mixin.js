import { commonMixinConstants, defaultPagination } from 'src/constants'
import { mapGetters } from 'vuex'
import { hideShowFullSpinner, convertArrayToObject } from 'src/utils'
import CustomConfirm from 'components/common/custom-confirm'

import formatDate from 'src/filters/formatDate'
import currency from 'src/filters/currency'

export default ({ Vue }) => {
  Vue.mixin({
    data: function () {
      return {
        ...commonMixinConstants,
        defaultPagination,
        lazyValidationRules: true,
        noDataPlaceHolder: '(Not Set)',
        statues: {
          0: { status: 'In Active', class: 'nagative' },
          1: { status: 'Active', class: 'success' },
        },
      }
    },
    computed: {
      ...mapGetters('auth', ['userData']),
      isMobile() {
        return this.$q.platform.is.mobile
      },
      isCordova() {
        return this.$q.platform.is.cordova
      },
    },
    methods: {
      formatDate,
      currency,
      hideShowFullSpinner,
      convertArrayToObject,
      visiConfirm(message) {
        return this.$q.dialog({
          component: CustomConfirm,
          parent: this,
          text: message,
          // description: `Sed ultricies ut dolor pellentesque finibus. Sed laoreet elit lacus,
          // sit amet imperdiet leo lobortis eget.`,
        })
      },
      futureDatesOption(date, includeToday = true) {
        if (includeToday) return date >= formatDate(new Date(), 'YYYY/MM/DD')
        return date > formatDate(new Date(), 'YYYY/MM/DD')
      },
    },
  })
}
