<template>
  <visi-dialog
    :dialog="dialog"
    title="View Booking"
    cardClass="q-card-md"
    :beforeShow="beforeShow"
    :loading="loading"
    remove-param-on-hide
  >
    <template v-slot:ScrollContent>
      <div class="form q-pa-md" v-if="detail && detail.customer">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="row q-col-gutter-md q-mb-lg items-center">
              <div class="col-12 col-md">
                <q-btn
                  unelevated
                  no-caps
                  color="light-primary"
                  text-color="primary"
                  size="13px"
                  padding="5px 15px"
                  class="no-hover"
                  @click="editBooking"
                >
                  <q-icon size="15px" name="edit" class="q-mr-sm" /> Edit
                  Booking
                </q-btn>
                <q-btn
                  unelevated
                  no-caps
                  color="light-primary"
                  text-color="primary"
                  size="13px"
                  padding="5px 15px"
                  class="no-hover cancel"
                  @click="cancelBooking"
                >
                  <q-icon size="15px" name="cancel" class="q-mr-sm"/> Cancel
                  Booking
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="row q-col-gutter-md">
              <!-- -->
              <div class="col-12 col-md-12">
                <h3 class="text-h6 text-dark q-my-none">
                  Customer Information
                </h3>
                <q-separator class="q-mt-sm" />
              </div>

              <!-- -->
              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Customer Name </span>
                  {{ detail.customer.first_name }}
                  {{ detail.customer.last_name }}
                </div>
              </div>
              <!--  -->
              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Customer Email </span>
                  {{ detail.customer.email }}
                </div>
              </div>
              <!--  -->

              <!--  -->
              <div class="col-12 col-md-12">
                <div class="form-text">
                  <span>Customer Address </span>
                  {{ detail.customer | formatAddress }}
                </div>
              </div>
              <!--  -->

              <div class="col-12 col-md-12">
                <h3 class="text-h6 text-dark q-my-none"> Park Information </h3>
                <q-separator class="q-mt-sm" />
              </div>

              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text" v-if="detail.park">
                  <span>Park </span>
                  {{ detail.park.title }}
                </div>
              </div>
              <!--  -->

              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text" v-if="detail.location">
                  <span>location </span>
                  {{ detail.location.title }}
                </div>
              </div>
              <!--  -->

              <div
                class="col-12 col-md-12"
                v-for="(del, index) in detail.detail"
                :key="index"
              >
                <div class="row">
                  <!--  -->
                  <div class="col-12 col-md-4" v-if="del.accommodation">
                    <div class="form-text">
                      <span>Accommodation </span>
                      {{ del.accommodation.title }}
                    </div>
                  </div>
                  <!--  -->

                  <!--  -->
                  <div class="col-12 col-md-6" v-if="del.accommodation_type">
                    <div class="form-text">
                      <span>Accommodation Type </span>
                      {{ del.accommodation_type.title }}
                    </div>
                  </div>
                  <!--  -->

                  <!--  -->
                  <div class="col-12 col-md-2">
                    <div class="form-text">
                      <span>Guest </span>
                      {{ del.no_of_guest || noDataPlaceHolder }}
                    </div>
                  </div>
                  <!--  -->
                </div>
              </div>

              <div class="col-12 col-md-12">
                <h3 class="text-h6 text-dark q-my-none">
                  Booking Information
                </h3>
                <q-separator class="q-mt-sm" />
              </div>

              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span class="text-uppercase">Check-In Date </span>
                  {{ detail.start | formatDate }}
                </div>
              </div>
              <!--  -->
              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span class="text-uppercase">Check-out Date </span>
                  {{ detail.end | formatDate }}
                </div>
              </div>
              <!--  -->

              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Rate </span>
                  {{ detail.rate | currency }}
                </div>
              </div>
              <!--  -->
              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span class="text-uppercase">Total Days </span>
                  {{ detail.total_days }}
                </div>
              </div>
              <!--  -->

              <div class="col-12 col-md-12">
                <h3 class="text-h6 text-dark q-my-none"> Rate Information </h3>
                <q-separator class="q-mt-sm" />
              </div>

              <div class="col-12 col-md-12">
                <table
                  width="100%"
                  class="q-table"
                  style="maring-left: -12px !important"
                >
                  <tr>
                    <td>
                      <span> <label>Total Rate </label> </span></td
                    >
                    <td>{{ detail.total_rate | currency }}</td>
                  </tr>

                  <tr>
                    <td>
                      <span> <label>Discount </label> </span></td
                    >
                    <td>- {{ detail.discountAmount | currency }}</td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <hr
                        role="separator"
                        aria-orientation="horizontal"
                        class="
                          q-separator
                          q-mt-sm
                          q-separator
                          q-separator--horizontal
                        "
                      />
                    </td>
                  </tr>

                  <tr v-for="info of detail.taxes" :key="info.id">
                    <td>{{ info.tax_name }} ({{ info.tax_per }}%)</td>
                    <td>+{{ info.tax_per | currency }}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <hr
                        role="separator"
                        aria-orientation="horizontal"
                        class="
                          q-separator
                          q-mt-sm
                          q-separator
                          q-separator--horizontal
                        "
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span> <label>Total </label> </span></td
                    >
                    <td>{{ detail.bill_amount | currency }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
export default {
  name: 'BookingDetail',
  data() {
    return {
      dialog: 'BookingDetail',
      detail: {},
      loading: false,
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
    beforeShow() {
      if (this.properties.id) {
        this.loading = true
        this.$store
          .dispatch('bookings/detailById', this.properties.id)
          .then((response) => {
            if (response.status) this.detail = response.data
          })
          .finally(() => {
            this.loading = false
          })
      }
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
