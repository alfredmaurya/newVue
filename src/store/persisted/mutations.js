export function TOGGLE_MINISTATE(state) {
  state.enabledMiniState = !state.enabledMiniState
}

export function TOGGLE_THEME(state) {
  state.currentTheme = state.currentTheme < 3 ? state.currentTheme + 1 : 1
}

export function SET_AUTH_DATA(state, authData) {
  state.authData = authData
}
