<template>
  <visi-dialog
    :dialog="dialog"
    title="Cancel Booking"
    cardClass="q-card-md"
    :beforeShow="beforeShow"
    :loading="loading"
    remove-param-on-hide
  >
    <template v-slot:ScrollContent>
      <div class="form q-pa-md" v-if="detail && detail.customer">
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
              <div class="col-12 col-md-12">
                <h3 class="text-h6 text-dark q-my-none">
                  Refund Information
                </h3>
                <q-separator class="q-mt-sm" />
              </div>

              <!-- <div class="col-12 col-md-12"> -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Payer Name </span>
                  {{ payerDetails.name.full_name }}
                </div>
              </div>
              <!--  -->
              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Payer Address</span>
                  {{ payerDetails.address.address_line_1 }}
                  {{ payerDetails.address.address_line_2 }}
                  {{ payerDetails.address.admin_area_2 }}
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Transaction ID</span>
                  {{ transactionId }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text"> </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Refund Amount</span>
                  $ {{ transactionAmount.amount.value }}
                </div>
              </div>
              <!-- <table
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
                </table> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="row q-col-gutter-md q-mb-lg items-center">
              <div class="col-12 col-md">
                <!-- <q-btn
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
                </q-btn> -->
                <q-btn
                  unelevated
                  no-caps
                  color="light-primary"
                  text-color="primary"
                  size="13px"
                  padding="5px 15px"
                  class="no-hover cancelBooking"
                  @click="cancelBooking"
                >
                  <!-- <q-icon size="15px" name="cancel" class="q-mr-sm"/> Cancel -->
                  Confirm Cancellation
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
import axios from 'axios'
export default {
  name: 'cancel',
  props: ['parkId', 'updateEvent', 'accommodation', 'clearSelection'],
  data() {
    return {
      dialog: 'Cancel',
      detail: {},
      loading: false,
      transactionId: '',
      transactionAmount: '',
      payerDetails: '',
      cancellationId: '',
      access_token: '',
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
        },
      })
    },

    cancelBooking() {
      this.loading = true
      ;(async () => {
        let newTransactionValue={...this.transactionAmount}
        newTransactionValue.amount.value="100"
        console.log(newTransactionValue,'console')
        const refund = await axios({
          url: `https://api.sandbox.paypal.com/v2/payments/captures/${this.transactionId}/refund`,
          method: 'post',
          headers: {
            Authorization: `Bearer ${this.access_token}`,
            Accept: 'application/json',
          },
          data: newTransactionValue,
        })
        this.cancellationId = refund.data.id
        let param = {
          cancellation_id: this.cancellationId,
          id: this.properties.id,
          booking_status: 'cancelled',
          transaction_id: this.transactionId,
          refund_amount: this.transactionAmount.amount.value,
          transaction_fee: 0,
          total_refunded_amount: this.transactionAmount.amount.value,
        }
        this.$store
          .dispatch('bookings/cancelBooking', param)
          .then((response) => {
            if (response.status) {
              // this.paidFor = false
              // this.updated = true
              this.updateDialogState({
                dialog: this.dialog,
                val: false,
              })
              // this.showSuccess('Booking has been confirmed successfully')
              this.showSuccess('Booking has been cancelled successfully')
              if (this.updateEvent) this.updateEvent(response.data)
            } else if (response.message) {
              if (typeof response.message === 'object') {
                for (const k in response.message) {
                  this.showError(response.message[k])
                }
              } else if (
                typeof response.message === 'string' ||
                response.message instanceof String
              ) {
                this.showError(response.message)
              }
            }
          })
          .finally(() => {
            this.submitting = false
          })
      })()
    },
    beforeShow() {
      if (this.properties.id) {
        this.loading = true
        //prod
        // let user='AUJEmAKamEI6MLqKp9QYRiCaaWSkFH-qXV2PLDPt24UvYbRslcZivv4t9TuH_ZUER_QLF2zzzNgBMHXq';
        // let pass='EBgr2p6fHIAsnKDrlDI10mVwPS6XQYq-F9XGw8p-oGIqxVwFslioDoqp5yf3PVlbSxncogRcmZzZ5rO7';
        //dev
        let user =
          'AbFOmxR77DYBeM_0CL_IjzJApj0yxvhoxPxlWrejOp4ZoDvI4omSGIllAombWYb9Y0VEX0nmyBDqsNEL'
        let pass =
          'EOFIh0oPX0w1Aj-xjfqbiv8zzUSFR2pCx8h3GipPt6WSAduPfFTuotngkV9n038ucIS9cqaHZsf3f2sW'
        ;(async () => {
          try {
            const {
              data: { access_token },
            } = await axios({
              url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Accept-Language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded',
              },
              auth: {
                username: user,
                password: pass,
              },
              params: {
                grant_type: 'client_credentials',
              },
            })
            const transactionDetails = await axios({
              url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${this.properties.detail['order_id']}`,
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json',
              },
            })
            let id = ''
            let refunddetails = {}
            let payerDetails = {}
            id =
              transactionDetails &&
              transactionDetails['data']['purchase_units'][0]['payments'][
                'captures'
              ][0]['id']
            payerDetails =
              transactionDetails &&
              transactionDetails['data']['purchase_units'][0]['shipping']
            refunddetails = {
              amount:
                transactionDetails &&
                transactionDetails['data']['purchase_units'][0]['payments'][
                  'captures'
                ][0]['amount'],
            }
            this.transactionId = id
            this.transactionAmount = refunddetails
            this.payerDetails = payerDetails
            this.access_token = access_token
            this.detail = this.properties['detail']
            this.loading = false
          } catch (e) {
            console.error(e)
          }
        })()
      }
    },
  },
}
</script>
<style lang="scss">
.q-table {
  margin-left: -12px;
}
.cancelBooking {
  // margin-left: 10px;
  background: #f64e60;
  color: black !important;
}
</style>
