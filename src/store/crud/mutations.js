import Vue from 'vue'
import { convertArrayToObject } from 'src/utils'

export const UPDATE_PAGINATION = (state, pagination) => {
  state.pagination = Object.assign({}, state.pagination, pagination)
}

export const SET_LISTING = (state, { module = '', listing, refresh }) => {
  if (!module) return

  if (!state.listingData[module]) {
    Vue.set(state.listingData, module, {
      listing: {},
    })
  }

  if (refresh) {
    state.listingData[module].listing = Object.assign(
      {},
      convertArrayToObject(listing, 'id', `${module}ID`)
    )
  } else {
    state.listingData[module] = Object.assign(
      {},
      state.listingData[module].listing,
      convertArrayToObject(listing, 'id', `${module}ID`)
    )
  }
}

export const ADD_UPDATE_FROM_LISTING = (state, { module = '', data }) => {
  if (!state.listingData[module]) {
    state.listingData[module] = {
      listing: {},
    }
  }

  if (data && state.listingData[module].listing[`${module}ID-${data.id}`]) {
    Vue.set(state.listingData[module].listing, `${module}ID-${data.id}`, data)
  } else
    state.listingData[module].listing = Object.assign(
      { [`${module}ID-${data.id}`]: data },
      state.listingData[module].listing
    )
}

export const DELETE_BY_ID = (state, { id, module }) => {
  if (state.listingData[module] && state.listingData[module].listing)
    Vue.delete(state.listingData[module].listing, `${module}ID-${id}`)
}
