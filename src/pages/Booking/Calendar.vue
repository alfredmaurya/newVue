<template>
  <div class="b1-i1">
    <div class="b1-i2">
      <FullCalendar :options="calendarOptions" ref="fullCalendar" />
    </div>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

export default {
  name: 'VisiCalendar',
  props: {
    parkId: {
      type: [String, Number],
      default: '',
    },
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      canUpdate: true,
      droppable: true,
      isClicked: false,
      calendarOptions: {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
        },
        plugins: [dayGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        eventResize: this.eventClick,
        eventDrop: this.eventClick,
        events: [],
        dayMaxEvents: true,
        editable: true,
        selectable: true,
        select: this.onSelect,
        eventClick: this.eventClick,
        datesSet: this.datesSet,
        eventConstraint: {
          start: new Date(Date.now() + 20 * 60 * 1000),
          end: 'current month end',
        },
      },
      bookings: [],
      viewLoaded: {},
    }
  },
  methods: {
    datesSet(data) {
      if (!this.canUpdate) return

      this.canUpdate = false
      let startFormatted = this.formatDate(data.start, 'YYYY-MM-DD'),
        emdFormatted = this.formatDate(data.end, 'YYYY-MM-DD')

      this.hideShowFullSpinner(true, 'Loading Bookings...')

      this.$store
        .dispatch('bookings/getBooking', {
          park_id: this.parkId,
          from_date: startFormatted,
          to_date: emdFormatted,
          booking_type:'booked',
          pagination: 0,
        })
        .then((result) => {
          if (result.status && result.data) {
            this.viewLoaded[`${startFormatted}:${emdFormatted}`] =
              this.bookings = this.convertArrayToObject(
                result.data.bookingList,
                'id'
              )

            this.setBookingsOnCalendar()
          }
        })
        .finally(() => {
          this.hideShowFullSpinner(false)
          this.canUpdate = true
        })
        
    },
    eventClick(eventClickInfo) {
      if (new Date(eventClickInfo.event.startStr) - new Date() <= 0) {
        //return this.showError('Please select future date.')
      }

      this.updateDialogState({
        dialog: 'AddUpdateEvent',
        val: true,
        properties: {
          type: 'edit',
          id: eventClickInfo.event.id,
          startStr: eventClickInfo.event.startStr,
          endStr: eventClickInfo.event.endStr,
          ...eventClickInfo.event.extendedProps,
          oldEvent: eventClickInfo.oldEvent
            ? {
                ...eventClickInfo.oldEvent.extendedProps,
                id: eventClickInfo.event.id,
                end: this.formatDate(eventClickInfo.oldEvent.end, 'YYYY-MM-DD'),
                start: this.formatDate(
                  eventClickInfo.oldEvent.start,
                  'YYYY-MM-DD'
                ),
                title: eventClickInfo.oldEvent.title,
              }
            : null,
        },
      })
    },
    onSelect(selectionInfo) {
      if (new Date(selectionInfo.start) - new Date() <= 0) {
        //return this.showError('Please select future date.')
      }

      selectionInfo.jsEvent.preventDefault()
      selectionInfo.jsEvent.stopPropagation()

      this.updateDialogState({
        dialog: 'AddUpdateEvent',
        val: true,
        properties: {
          type: 'add',
          ...selectionInfo,
        },
      })
    },
    setBookingsOnCalendar() {
      this.calendarOptions.events = Object.values(this.bookings) || []
      if (this.$refs.fullCalendar)
        this.$refs.fullCalendar.$emit('refetch-events')
    },
    updateEvent(booking) {
      this.bookings = Object.assign({}, this.bookings, {
        [booking.id]: booking,
      })

      this.canUpdate = true

      this.setBookingsOnCalendar()
    },
  },
}
</script>
