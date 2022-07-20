import moment from 'moment'

export default (dateString = Date.now(), format = 'DD MMM, YYYY') => {
  if (dateString) return moment(dateString).format(format)
  return '-'
}
