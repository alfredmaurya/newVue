import { AccommodationAgent } from 'src/agent'

export async function getListing({}, params = {}) {
  try {
    let { data } = await AccommodationAgent.get(params)
    return data
  } catch (error) {
    return error
  }
}

export async function addUpdate({ commit }, body = {}) {
  try {
    if (body.id) {
      let { data } = await AccommodationAgent.update(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    } else {
      let { data } = await AccommodationAgent.add(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    }
  } catch (error) {
    return error
  }
}

export async function deleteById({ commit }, id) {
  try {
    let { data } = await AccommodationAgent.delete(id)
    if (data && data.status) commit('DELETE_BY_ID', id)
    return data
  } catch (error) {
    return error
  }
}

export async function detailById({}, id) {
  try {
    let { data } = await AccommodationAgent.detail(id)
    return data
  } catch (error) {
    return error
  }
}
