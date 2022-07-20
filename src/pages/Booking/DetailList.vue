<template>
  <visi-dialog
    :dialog="dialog"
    title="Existing Booking List"
    cardClass="q-card-lg"
    :beforeShow="beforeShow"
    :loading="loading"
    remove-param-on-hide
  >
    <template v-slot:ScrollContent>
        <div class="b1-i1">
    <div class="b1-i2">
      <visi-grid
        :title="accommodation_type"
        global-search
        :data="Object.values(bookings)"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
         :resetPagination="resetPagination"
        rowKey="id"
        classes="table-theme"
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
  </visi-dialog>
</template>
<script>
export default {
  name: 'DetailList',
  data() {
    return {
      dialog: 'DetailList',
      detail: {},
      loading: false,
      bookings:[],
      accommodation_type:'',
      pagination: {
        // page: 1,
        // rowsPerPage: 5,
        // rowsNumber: null,
        // hasNext: true,
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

    }
  },
  computed: {
    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    editBooking() {
      this.updateDialogState({
        dialog: 'AddUpdateEvent',
        val: true,
        properties: {
          ...this.properties,
          startStr: this.properties.start,
          endStr: this.properties.end,
          detail:this.properties.detail
        },
      })
    },
    cancelBooking(){
      this.updateDialogState({
        dialog: 'Cancel',
        val: true,
        properties: {
          ...this.properties,
          detail:this.detail,
          startStr: this.properties.start,
          endStr: this.properties.end,
        },
      })
    },
    async beforeShow() {
    //   if (this.properties.id) {
    //     this.loading = true
    //     this.$store
    //       .dispatch('bookings/detailById', this.properties.id)
    //       .then((response) => {
    //         if (response.status) this.detail = response.data
    //       })
    //       .finally(() => {
    //         this.loading = false
    //       })
    //   }
      if(this.properties.totalBookings){
        this.bookings=this.convertArrayToObject(
              this.properties.totalBookings,
              'id'
            )
      }
      if(this.properties.accommodation_type){
        this.accommodation_type="Accommodation Type: "+this.properties.accommodation_type
      }
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
<style lang="scss">
.q-table {
  margin-left: -12px;
}
.cancel{
  margin-left: 10px;
  background: #f64e60;
  color: black !important;
}
</style>
