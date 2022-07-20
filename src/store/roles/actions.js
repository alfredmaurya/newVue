import { RoleAgent } from 'src/agent'

export async function getListing({}, params = {}) {
  try {
    let { data } = await RoleAgent.get(params)
    return data
  } catch (error) {
    return error
  }
}

export async function addUpdate({ commit }, body = {}) {
  try {
    if (body.id) {
      let { data } = await RoleAgent.update(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    } else {
      let { data } = await RoleAgent.add(body)
      if (data.status) commit('ADD_UPDATE_FROM_LISTING', data.data)
      return data
    }
  } catch (error) {
    return error
  }
}

export async function deleteById({ commit }, id) {
  try {
    let { data } = await RoleAgent.delete(id)
    if (data && data.status) commit('DELETE_BY_ID', id)
    return data
  } catch (error) {
    return error
  }
}

export async function detailById({}, id) {
  try {
    let { data } = await RoleAgent.detail(id)
    return data
  } catch (error) {
    return error
  }
}

export async function getPermissions({ commit }) {
  try {
    let { data } = await RoleAgent.getPermissions()
    if (data.status && data.data) commit('SET_PERMISSIONS', data.data)
    return data
  } catch (error) {
    return error
  }
}
