export default (address) => {
  let formatString = ''

  if (typeof address === 'object' && address !== null) {
    if (address.address_line1)
      formatString = formatString.concat(address.address_line1)
    if (address.address_line2)
      formatString = formatString.concat(', ', address.address_line2)
    if (address.city) formatString = formatString.concat(', ', address.city)
    if (address.state) formatString = formatString.concat('\n', address.state)
    if (address.postcode)
      formatString = formatString.concat('-', address.postcode)
    if (address.zipCode)
      formatString = formatString.concat('-', address.zipCode)
  } else {
    return '-'
  }

  return formatString
}
