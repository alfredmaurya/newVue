export const userData = (state) => state.userData || {}

export const hasPermission = (state, getters) => (permission) => {
  let role = getters['userData'].role
  if (!role) return false
  if (!permission) return true
  if (role.allow_everything) return true

  if (typeof permission === 'string' || permission instanceof String)
    return role.permission.indexOf(permission) > -1
  else if (permission.constructor == Array) {
    let hasAnyPermission = false

    permission.every(function (perm) {
      if (role.permission.indexOf(perm) > -1) {
        hasAnyPermission = true
        return false
      }
      return true
    })
    return hasAnyPermission
  }
  return false
}
export const hasAnyPermission = (state, getters) => {
  let role = getters['userData'].role
  if (!role) return false

  if (role.allow_everything) return true
  return !!role.permission.length
}
