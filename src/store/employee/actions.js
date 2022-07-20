import { EmployeeAgent } from 'src/agent'

export async function getListing({}, params = {}) {
  try {
    let { data } = await EmployeeAgent.get(params)
    return data
  } catch (error) {
    return error
  }
}

export async function addUpdate({ commit }, body = {}) {
  try {
    if (body.id) {
      let { data } = await EmployeeAgent.update(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    } else {
      let { data } = await EmployeeAgent.add(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    }
  } catch (error) {
    return error
  }
}

export async function deleteById({ commit }, id) {
  try {
    let { data } = await EmployeeAgent.delete(id)
    if (data && data.status) commit('DELETE_BY_ID', id)
    return data
  } catch (error) {
    return error
  }
}

export async function detailById({}, id) {
  try {
    let { data } = await EmployeeAgent.detail(id)
    return data
  } catch (error) {
    return error
  }
}
