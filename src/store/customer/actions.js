import { CustomersAgent } from 'src/agent'

export async function getListing({}, params = {}) {
  try {
    let { data } = await CustomersAgent.get(params)
    return data
  } catch (error) {
    return error
  }
}

export async function addUpdate({ commit }, body = {}) {
  try {
    if (body.id) {
      let { data } = await CustomersAgent.update(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    } else {
      let { data } = await CustomersAgent.add(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    }
  } catch (error) {
    return error
  }
}

export async function deleteById({ commit }, id) {
  try {
    let { data } = await CustomersAgent.delete(id)
    if (data && data.status) commit('DELETE_BY_ID', id)
    return data
  } catch (error) {
    return error
  }
}
export async function detailById({}, id) {
  try {
    let { data } = await CustomersAgent.detail(id)
    return data
  } catch (error) {
    return error
  }
}
