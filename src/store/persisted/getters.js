export const currentTheme = (state, getters, rootState, rootGetters) =>
  rootGetters['common/themeOptions'][state.currentTheme] || {}

export const currentThemeClass = (state, getters) =>
  getters['currentTheme'].bodyClass || ''

export const currentThemeName = (state, getters) =>
  getters['currentTheme'].name || 'Theme'

export const authData = (state) => state.authData || {}

export const isLoggedIn = (state, getters) => !!getters.authData.token

export const authToken = (state, getters) => getters.authData.token
