<template>
  <SunWest
    v-if="park && park.slug == 'sun-west'"
    :bookings="bookings"
    :fromDate="fromDate"
    ref="visiMap"
    :maintenance="maintenance"
  />
  <BudsMap
    v-else-if="park && park.slug == 'bud-s-place'"
    :bookings="bookings"
    :fromDate="fromDate"
    :toDate="toDate"
    :totalBookings="totalBookings"
    ref="visiMap"
    :maintenance="maintenance"
  />
  <ElDorado
    v-else-if="park && park.slug == 'el-dorado'"
    :bookings="bookings"
    :fromDate="fromDate"
    ref="visiMap"
    :maintenance="maintenance"
  />
</template>
<script>
import SunWest from './SunWest'
import BudsMap from './BudsMap'
import ElDorado from './ElDorado'

export default {
  props: {
    parkId: {
      type: [String, Number],
      default: new String(),
    },
    park: {
      type: Object,
      default: new Object(),
    },
    fromDate: {
      type: String,
      default: new String(),
    },
    toDate: {
      type: String,
      default: new String(),
    },
  },
  components: {
    SunWest,
    BudsMap,
    ElDorado,
  },
  data() {
    return {
      bookings: {},
      maintenance: {},
      totalBookings:[]
    }
  },
  watch: {
    parkId() {
      this.getBookings()
      this.getMaintenanceList()
    },
    fromDate() {
      this.getBookings()
      this.getMaintenanceList()
    },
    toDate() {
      this.getBookings()
      this.getMaintenanceList()
    },
  },
  methods: {
    getMaintenanceList() {
      let fromDate = '',
        toDate = ''

      if (this.fromDate) {
        let splitDob = this.fromDate.split('/')
        fromDate = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
      }

      if (this.toDate) {
        let splitDob = this.toDate.split('/')
        toDate = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
      }

      if (!fromDate) return

      if (!toDate) {
        let endDate = new Date(fromDate)
        endDate.setDate(endDate.getDate() + 1)
        toDate = this.formatDate(endDate, 'YYYY-MM-DD')
      }

      this.hideShowFullSpinner(true)

      return this.$store
        .dispatch('crud/getListing', {
          module: 'accommodation_type/maintenance/list',
          params: {
            park_id: this.parkId,
            from_date: fromDate,
            to_date: toDate,
            pagination: 0,
          },
        })
        .then((data) => {
          if (data.status) {
            let maintenance = {}
            data.data.forEach((accommodation) => {
              if (
                accommodation.accommodation_type &&
                accommodation.accommodation_type.slug
              ) {
                maintenance[accommodation.accommodation_type.slug] = true
              }
            })

            this.maintenance = maintenance
          }
        })
        .finally(() => {
          this.hideShowFullSpinner(false)
        })
    },
    updateEvent() {
      this.getBookings()
    },
    getBookings() {
      let fromDate = '',
        to_date = ''

      if (this.fromDate) {
        let splitDob = this.fromDate.split('/')
        fromDate = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
      }

      if (!fromDate) return

      if (this.toDate) {
        let splitDob = this.toDate.split('/')
        to_date = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
      }

      // let endDate = new Date(fromDate)
      // endDate.setDate(endDate.getDate() + 1)
      // to_date = this.formatDate(endDate, 'YYYY-MM-DD')

      this.hideShowFullSpinner(true, 'Loading Bookings...')

      this.$store
        .dispatch('bookings/getBooking', {
          park_id: this.parkId,
          from_date: fromDate,
          to_date: to_date,
          booking_type:'booked',
          pagination: 0,
        })
        .then((result) => {
          if (result.status && result.data) {
            if (result.data.bookingList) {
              let bookings = {}

              result.data.bookingList.forEach((booking) => {
                booking.detail.forEach((det) => {
                  bookings[det.accommodation_type.slug] = booking
                })
              })

              this.bookings = bookings
              this.totalBookings=result.data.bookingList

              if (this.$refs.visiMap.reDraw) this.$refs.visiMap.reDraw()
            }
          }
        })
        .finally(() => {
          this.hideShowFullSpinner(false)
        })
    },
    clearSelection() {
      if (this.$refs.visiMap.clearSelection) this.$refs.visiMap.clearSelection()
    },
  },
  mounted() {
    this.getBookings()
    this.getMaintenanceList()
  },
}
</script>
