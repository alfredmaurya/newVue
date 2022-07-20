import {
  LocationAgent,
  EmployeeAgent,
  RoleAgent,
  FacilityAgent,
  TaxAgent,
  CustomersAgent,
  AccommodationAgent,
  AccommodationTypeAgent,
} from 'src/agent'

export function getAllLocation({ commit }) {
  return LocationAgent.get().then(({ data }) => {
    if (data.status && data.data) commit('SET_LOCATIONS', data.data)
  })
}

export function getAllFacilitys({ commit }) {
  return FacilityAgent.get().then(({ data }) => {
    if (data.status && data.data) commit('SET_FACILITYS', data.data)
  })
}

export function getAllTax({ commit }) {
  return TaxAgent.get().then(({ data}) => {
    if (data.status && data.data) commit('SET_TAX', data.data)
  });
}

export function getAllEmployee({ commit }) {
  return EmployeeAgent.get({
    'page[number]': 1,
    'page[size]': 1000,
  }).then(({ data }) => {
    if (data.status && data.data) commit('SET_EMPLOYEES', data.data.data)
  })
}

export function getAllRoles({ commit }) {
  return RoleAgent.get({
    'page[number]': 1,
    'page[size]': 1000,
  }).then(({ data }) => {
    if (data.status && data.data) commit('SET_ROLES', data.data.data)
  })
}

export function getAllCustomers({ commit }) {
  return CustomersAgent.get({
    pagination: 0,
  }).then(({ data }) => {
    if (data.status && data.data) commit('SET_CUSTOMERS', data.data)
  })
}

export function getAllAccommodation({ commit }) {
  return AccommodationAgent.get({
    pagination: 0,
  }).then(({ data }) => {
    if (data.status && data.data) commit('SET_ACCOMMODATAION', data.data)
  })
}

export function getAllAccommodationType({ commit }) {
  return AccommodationTypeAgent.get({
    pagination: 0,
  }).then(({ data }) => {
    if (data.status && data.data) commit('SET_ACCOMMODATAION_TYPE', data.data)
  })
}
