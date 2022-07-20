export default (value) => {
  const amt = parseFloat(value)

  if (amt) {
    if (Math.abs(amt) > 999)
      return `$${(Math.abs(amt) / 1000).toFixed(2) + 'k'}`

    return `$${Math.abs(amt).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`
  }

  return '$0.00'
}
