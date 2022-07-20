import formatAddress from 'src/filters/formatAddress'
import formatDate from 'src/filters/formatDate'
import currency from 'src/filters/currency'
import kcurrency from 'src/filters/k-currency'

export default async ({ Vue }) => {
  Vue.filter('formatDate', formatDate)
  Vue.filter('formatAddress', formatAddress)
  Vue.filter('currency', currency)
  Vue.filter('kcurrency', kcurrency)
}
