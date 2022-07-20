import { convertArrayToObject } from 'src/utils'

export const THEME_APPLIED = (state, val) => {
  state.themeApplied = val
}

export const REMOVE_ANIMATION = (state) => {
  state.enterClass = ''
  state.leaveClass = ''
}

export const ADD_ANIMATION = (state) => {
  state.enterClass = 'animated visiZoomIn'
  state.leaveClass = 'animated visiZoomOut'
}

export const SET_ROLES = (state, roles) => {
  state.roles = roles
}

export const SET_EMPLOYEES = (state, employees) => {
  state.employees = employees
}

export const SET_LOCATIONS = (state, locations) => {
  state.locations = locations
}

export const SET_FACILITYS = (state, facilitys) => {
  state.facilitys = facilitys
}

export const SET_CUSTOMERS = (state, customers) => {
  state.customers = customers
}

export const SET_ACCOMMODATAION = (state, accommodation) => {
  state.accommodation = accommodation
}

export const SET_ACCOMMODATAION_TYPE = (state, accommodationType) => {
  state.accommodation = accommodationType
}
