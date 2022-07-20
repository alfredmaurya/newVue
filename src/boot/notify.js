import { Notify } from 'quasar'
const timeout = 4000

export const NotifyMethods = {
  showSuccess(message, position = 'bottom', actions = []) {
    if (message)
      Notify.create({
        message: message,
        position: position,
        timeout: timeout,
        actions: actions,
        color: 'teal',
        icon: 'check_circle',
      })
  },
  showError(message, position = 'bottom') {
    Notify.create({
      message: message,
      position: position,
      timeout: timeout,
      color: 'negative',
      icon: 'error',
    })
  },
  showWarning(message, position = 'bottom') {
    Notify.create({
      message: `<i aria-hidden="true" role="presentation" class="material-icons q-icon notranslate text-warning q-ma-xs">warning</i>${message}`,
      position: position,
      timeout: timeout,
      html: true,
    })
  },
  showInfo(message) {},
}

export default ({ Vue }) => {
  Vue.mixin({
    methods: NotifyMethods,
  })
}
