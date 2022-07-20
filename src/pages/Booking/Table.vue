<template>
  <div class="b1-i1">
    <div class="b1-i2">
      <visi-grid
        title="Bookings"
        global-search
        :data="Object.values(bookings)"
        :columns="columns"
        :loading="loading"
        :onRequest="onRequest"
        :pagination="pagination"
        rowKey="id"
        classes="table-theme"
        :resetPagination="resetPagination"
        show-refresh
        ref="bookingGrid"
      >
        <!--date-filter  -->
        <template v-slot:body-cell-Action="props">
          <q-btn-dropdown
            class="action-dropdown ddropdown"
            padding="5px"
            flat
            icon="more_vert"
          >
            <q-list class="dropdown-sm action-dropdown-box">
              <q-item
                clickable
                v-close-popup
                @click="
                  updateDialogState({
                    dialog: 'BookingDetail',
                    val: true,
                    properties: props.row,
                  })
                "
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="visibility" size="15px" class="q-mr-xs" />
                    View
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="
                  updateDialogState({
                    dialog: 'AddUpdateEvent',
                    val: true,
                    properties: {
                      ...props.row,
                      startStr: props.row.start,
                      endStr: props.row.end,
                    },
                  })
                "
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="edit" size="15px" class="q-mr-xs" />
                    Edit
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </visi-grid>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableBooking',
  props: {
    parkId: {
      type: [String, Number],
      default: '',
    },
  },
  watch: {
    parkId() {
      this.$refs.bookingGrid.refresh()
    },
  },
  data() {
    return {
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: null,
        hasNext: true,
      },
      columns: [
        {
          name: 'customer',
          label: 'Customer Name',
          field: (row) => {
            if (row.customer)
              return `${row.customer.first_name} ${row.customer.last_name}`
            return this.noDataPlaceHolder
          },
          align: 'left',
          sortable: true,
          isVisible: true,
        },
        {
          name: 'customeremail',
          label: 'Customer Email',
          field: (row) => {
            if (row && row.customer) return `${row.customer.email}`
            return this.noDataPlaceHolder
          },
          align: 'left',
          isVisible: true,
          sortable: true,
        },
        {
          name: 'checkin',
          label: 'Check In Date',
          field: (row) => {
            if (row && row.start) return `${this.formatDate(row.start)}`
            return this.noDataPlaceHolder
          },
          align: 'left',
          sortable: true,
          isVisible: true,
        },
        {
          name: 'checkout',
          label: 'Check Out Date',
          field: (row) => {
            if (row && row.end) return `${this.formatDate(row.end)}`
            return this.noDataPlaceHolder
          },
          align: 'left',
          sortable: true,
          isVisible: true,
        },
        {
          name: 'Bill Amount',
          label: 'bill_amount',
          field: (row) => {
            return this.currency(row.bill_amount)
          },
          align: 'left',
          sortable: true,
          isVisible: true,
        },
        {
          name: 'Action',
          label: 'Action',
          align: 'left',
          isVisible: true,
        },
      ],
      bookings: {},
      filter: '',
    }
  },
  methods: {
    onRequest(props) {
      this.loading = true

      let params = {
        'page[number]': props.pagination.page || 1,
        'page[size]':
          props.pagination.rowsPerPage || this.localPagination.rowsPerPage,
        search: props.filter,
        park_id: this.parkId,
        booking_type:'booked',
        pagination: 1,
      }

      if (props.pagination && props.pagination.sortBy) {
        params.Sorts = props.pagination.sortBy
        params.SortsType = props.pagination.descending ? 'desc' : 'asc'
      }

      this.$store
        .dispatch('bookings/getBooking', params)
        .then((response) => {
          if (response && response.status) {
            this.bookings = this.convertArrayToObject(
              response.data.bookingList.data,
              'id'
            )

            this.pagination = Object.assign({}, this.pagination, {
              page: response.data.bookingList.current_page || 1,
              rowsPerPage: response.data.bookingList.per_page || 10,
              rowsNumber: response.data.bookingList.total,
              hasNext: !!response.data.bookingList.next_page_url || false,
              sortBy: (props.pagination && props.pagination.sortBy) || null,
              descending:
                (props.pagination && props.pagination.descending) || false,
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateEvent(booking) {
      this.bookings = Object.assign({}, this.bookings, {
        [booking.id]: booking,
      })
    },
    resetPagination() {
      this.pagination = Object.assign(
        {},
        this.pagination,
        this.defaultPagination
      )
    },
  },
}
</script>
