export default (value, applyNegSign = true, addPlusSign = false) => {
  const amt = parseFloat(value)
  if (amt)
    return `${
      amt < 0 && applyNegSign ? '- $' : addPlusSign ? '+ $' : '$'
    }${Math.abs(amt).toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  return '$0.00'
}
