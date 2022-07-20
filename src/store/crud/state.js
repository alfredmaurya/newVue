import { defaultPagination } from 'src/constants'

export default function() {
  return {
    listingData: {},
    pagination: { ...defaultPagination },
  }
}
