import BaseIcon from 'components/common/base-icon'
import LoadingSpinner from 'components/common/loading-spinner'
import InnerLoadingSpinner from 'components/common/inner-loading-spinner'
import VisiDialog from 'components/common/dialog/visi-dialog'
import VisiGrid from 'components/common/grid/visi-grid'
import GoogleAutoComplete from 'components/common/google-auto-complete'
import Alert from 'components/common/alert'

import Avtar from 'components/common/avtar'

export default async ({ Vue }) => {
  Vue.component('BaseIcon', BaseIcon)
  Vue.component('VisiDialog', VisiDialog)
  Vue.component('VisiGrid', VisiGrid)
  Vue.component('LoadingSpinner', LoadingSpinner)
  Vue.component('InnerLoadingSpinner', InnerLoadingSpinner)
  Vue.component('GoogleAutoComplete', GoogleAutoComplete)
  Vue.component('Alert', Alert) 
  Vue.component('Avtar', Avtar)
}