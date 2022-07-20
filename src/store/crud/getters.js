export const pagination = (state) => state.pagination

export const getListingByModule = (state) => (module) => {
  if (state.listingData && state.listingData[module])
    return Object.values(state.listingData[module].listing || {})
  return []
}
