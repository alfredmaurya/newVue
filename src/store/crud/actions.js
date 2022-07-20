import { CrudAgent } from 'src/agent'
import { NotifyMethods } from 'src/boot/notify'

export async function getListing({}, { module = '', params = {} }) {
  try {
    let { data } = await CrudAgent.get(module, params)
    return data
  } catch (error) {
    return error
  }
}

export async function addUpdate(
  { commit },
  { module = '', body = {}, id = '' }
) {
  try {
    if (body.id) {
      let { data } = await CrudAgent.update(module, body.id, body)
      if (data.status)
        commit('ADD_UPDATE_FROM_LISTING', {
          module,
          data: data.data,
        })
      return data
    } else {
      let { data } = await CrudAgent.add(module, body)
      if (data.status)
        commit('ADD_UPDATE_FROM_LISTING', {
          module,
          data: data.data,
        })
      return data
    }
  } catch (error) {
    return error
  }
}

export async function deleteById({ commit }, { id, module }) {
  try {
    let { data } = await CrudAgent.delete(module, id)
    if (data && data.status) commit('DELETE_BY_ID', { module, id })
    return data
  } catch (error) {
    return error
  }
}

export async function detailById({}, { id, module }) {
  try {
    let { data } = await CrudAgent.detail(module, id)
    return data
  } catch (error) {
    return error
  }
}

export async function exportData({}, { module, body = {} }) {
  try {
    let { data } = await CrudAgent.exportData(module, body)
    if (data.status && data.data) window.open(data.data)
    return data
  } catch (error) {
    NotifyMethods.showError(error.message)
    return error
  }
}
