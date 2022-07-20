import Vue from 'vue'

export const updateDialogState = (state, { dialog, val, parentDialog }) => {
  if (val) {
    if (parentDialog && !state.parentDialogs.includes(parentDialog)) {
      state.parentDialogs.push(parentDialog)
    }

    if (!parentDialog && !val) {
      state.parentDialogs.pop()
    }

    for (let key in state.dialog) {
      if (key != dialog && !state.parentDialogs.includes(key))
        Vue.set(state.dialog, key, false)
    }
  }

  Vue.set(state.dialog, dialog, val)
}

export const updateSidebarState = (state, val) => {
  state.sideBar = !state.sideBar
}

export const SET_DIALOG_PROPERTIES = (
  state,
  { dialog, properties, refresh = false }
) => {
  if (!state.properties[dialog]) {
    state.properties = Object.assign({}, state.properties, { [dialog]: {} })
  }
  if (refresh) {
    state.properties[dialog] = Object.assign({}, properties)
  } else {
    state.properties[dialog] = Object.assign(
      {},
      state.properties[dialog],
      properties
    )
  }
}

export const DELETE_DIALOG_PROPERTIES = (state, dialog) => {
  Vue.delete(state.properties, dialog)
}
