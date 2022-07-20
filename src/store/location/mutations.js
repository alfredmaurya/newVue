import Vue from 'vue'
import { convertArrayToObject } from 'src/utils'

let identifier = 'employeeID'

export const UPDATE_PAGINATION = (state, pagination) => {
  state.pagination = Object.assign({}, state.pagination, pagination)
}

export const SET_LISTING = (state, { listing, refresh }) => {
  if (refresh) {
    state.listing = Object.assign(
      {},
      convertArrayToObject(listing, 'id', identifier)
    )
  } else {
    state.listing = Object.assign(
      {},
      state.listing,
      convertArrayToObject(listing, 'id', identifier)
    )
  }
}

export const DELETE_BY_ID = (state, id) => {
  Vue.delete(state.listing, `${identifier}-${id}`)
}

export const ADD_UPDATE_FROM_LISTING = (state, target) => {
  if (target && state.listing[`${identifier}-${target.id}`]) {
    Vue.set(state.listing, `${identifier}-${target.id}`, target)
  } else
    state.listing = Object.assign(
      { [`${identifier}-${target.id}`]: target },
      state.listing
    )
}
