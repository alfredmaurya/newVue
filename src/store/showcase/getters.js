export const getDialogState = (state) => (dialog) => {
  return state.dialog[dialog] || false
}

export const getDialogProperties = (state) => (dialog) => {
  return state.properties[dialog] || {}
}

export const parentDialogs = (state) => state.parentDialogs
