import { AuthAgent } from 'src/agent'
import { setAxiosHeaders } from 'src/boot/axios'

export function logIn({ commit }, credentials) {
  return AuthAgent.logIn(credentials)
    .then(({ data }) => {
      if (data && data.data) {
        setAxiosHeaders(data.data.token)
        commit('persisted/SET_AUTH_DATA', data.data, { root: true })
      }
      return data
    })
    .catch((error) => error)
}

export async function getCurrentEmployee({ commit }) {
  try {
    let { data } = await AuthAgent.getCurrentEmployee()
    if (data.data) commit('SET_USER_DATA', data.data)
    return data
  } catch (error) {
    return error
  }
}

export function logOut({ commit }) {
  commit('persisted/SET_AUTH_DATA', null, { root: true })
  this.$router.push({ name: 'Login' })
}
export function forgotPassword({ commit }, body) {
  return AuthAgent.forgotPassword(body)
}

export function verifyResetPasswordToken({ commit }, restToken) {
  return AuthAgent.verifyResetPasswordToken(restToken)
}
export function resetpassword({ commit }, { restToken, body }) {
  return AuthAgent.resetpassword(restToken, body)
}
