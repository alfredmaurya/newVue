<template>
  <visi-dialog
    :dialog="dialog"
    title="Payment"
    show-footer
    :onHide="onHide"
    :beforeShow="beforeShow"
    :onSubmit="onSubmit"
    :submitting="submitting"
    :submitLabel="submitLabel"
    :loading="fullLoading"
    :onBack="onBack"
    :isOnBack="true"
    cardClass="q-card-lg"
  >
    <template v-slot:ScrollContent>
      <div>
        <div v-if="!paidFor">
          <div class="col-12 col-md-12">
            <table class="qtable" style="width: 100%">
              <tr>
                <td>
                  <span>
                    <label>Total Rate</label>
                  </span>
                </td>
                <td>{{ prices.total_rate | currency }}</td>
              </tr>

              <tr>
                <td>
                  <span>
                    <label>Discount</label>
                  </span>
                </td>
                <td>- {{ prices.discountAmount | currency }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <hr
                    role="separator"
                    aria-orientation="horizontal"
                    class="
                      q-separator q-mt-sm q-separator q-separator--horizontal
                    "
                  />
                </td>
              </tr>
              <tr v-for="tax of prices.taxes" :key="tax.id">
                <td>
                  <span>
                    <label>{{ tax.tax_name }} ({{ tax.tax_per }}%)</label>
                  </span>
                </td>
                <td>+ {{ tax.tax_amount | currency }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <hr
                    role="separator"
                    aria-orientation="horizontal"
                    class="
                      q-separator q-mt-sm q-separator q-separator--horizontal
                    "
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <label>Total</label>
                  </span>
                </td>
                <td>{{ prices.bill_amount | currency }}</td>
              </tr>
            </table>
            <!-- <q-separator class="q-mt-sm" /> -->
          </div>
        </div>

        <div v-if="paidFor">
           <h1>Please wait...</h1>
        </div>

        <div ref="paypal" class="paypalcss"></div>
      </div>
    </template>
  </visi-dialog>
</template>

<script>
// import image from "../assets/lamp.png"

import { mapGetters } from 'vuex'
import { date } from 'quasar'
import axios from 'axios'

function initialState() {
  return {
    submitLabel: 'Confirm Booking',
    dialog: 'PaymentEdit',
    title: 'Add Booking',
    loading: false,
    fullLoading: false,
    submitting: false,
    model: '',
    proxyDate: null,
    customerOptions: [],
    customer_id: '',
    accommodation_id: '',
    accommodation_type_id: '',
    discount: '',
    priceData: {},
    no_of_guest: 1,
    accommodationType: {},
    loadingAccommodation: false,
    accommodationOption: [],
    updated: false,
    bookingDetails: [
      {
        accommodation_id: '',
        accommodation_type_id: '',
        no_of_guest: '',
        accommodationTypeOption: [],
        loading: false,
      },
    ],
    maintenance: {},
    loaded: false,
    paidFor: false,
    product: {
      price: '',
      description: 'leg lamp from that one movie',
      img: './assets/lamp.jpg',
    },
    prices: '',
    order: '',
    customerName:'',
    customerEmail:''
  }
}
export default {
  
  name: 'PaymentEdit',
  props: ['parkId', 'updateEvent', 'accommodation', 'clearSelection'],
  data: initialState,
  created() {},
  mounted: function () {},
  computed: {
    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    onBack(){
      this.updateDialogState({
              dialog: 'AddUpdateEvent',
              val: true,
              properties: {
                ...this.properties,
                   startStr: this.properties.start,
          endStr: this.properties.end,
          detail:this.properties.detail,
            //    data:this.properties.order,
            //    bookingDetails:this.properties.bookingDetails,
            //    customerOptions:this.properties.customerOptions
              },
            })      
    },
    getCustomerDetails(){
        this.properties.customerOptions&&this.properties.customerOptions.map((i)=>{
           if(i.id==this.properties.order.customer_id){
             this.customerName=i.first_name+" "+i.last_name
             this.customerEmail=i.email
           }
        })
    },
    beforeShow() {
      this.getCustomerDetails()
      this.prices = this.properties.price
      this.order = this.properties.order
      const script = document.createElement('script')
      script.src =
        'https://www.paypal.com/sdk/js?client-id=AbFOmxR77DYBeM_0CL_IjzJApj0yxvhoxPxlWrejOp4ZoDvI4omSGIllAombWYb9Y0VEX0nmyBDqsNEL'

      //production
      // script.src =
      //   'https://www.paypal.com/sdk/js?client-id=AUJEmAKamEI6MLqKp9QYRiCaaWSkFH-qXV2PLDPt24UvYbRslcZivv4t9TuH_ZUER_QLF2zzzNgBMHXq'
      script.addEventListener('load', this.setLoaded)
      document.body.appendChild(script)
    },
    setLoaded: function () {
      this.loaded = true
      window.paypal
        .Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Hello Worls',
                  amount: {
                    currency_code: 'USD',
                    value: this.prices.bill_amount,
                  },
                },
              ],
            })
          },
          onApprove: async (data, actions) => {
            // console.log('Approved Data => ', data)
            const orderData=await this.$store.dispatch('bookings/addUpdate',this.order).then((res)=>{
               if (res.status) {
                  return res.data
               }else{
                 return false
               }
            })
            // let url=`https://bluebook-api.herokuapp.com/public/api/mail?from_date=${this.properties.order.start}&customer_name=${this.customerName}&customer_email=${this.customerEmail}&bookedby=${localStorage.getItem("firstName")+" "+localStorage.getItem("lastName")}`
            // const mail= await fetch(url,{"headers":{'Content-Type': 'application/json','Authorization':`Bearer ${localStorage.getItem('token')}`}}).then((res)=>{console.log(res)})
            let params={
              from_date:this.properties.order.start,
              customer_name:this.customerName,
              customer_email:this.customerEmail,
              bookedby:localStorage.getItem("firstName")+" "+localStorage.getItem("lastName")
            }
            const mail=this.$store.dispatch('bookings/triggerMail', params).then((res)=>{console.log(res)})

            console.log(orderData,"orderData")
            const order = await actions.order.capture()
            this.paidFor = true

            const param = {
              order_id: data.orderID,
              id: orderData.id,
              booking_status:'booked'
            }
            

            this.$store
              .dispatch('bookings/updateBookingPayment', param)
              .then((response) => {
                if (response.status) {
                  this.paidFor = false
                  this.updated = true
                  this.updateDialogState({
                    dialog: this.dialog,
                    val: false,
                  })
                  
                  this.showSuccess(response.message)
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
          },
          onError: (err) => {
            console.log(err)
          },
        })
        .render(this.$refs.paypal)
    },
  },
}
</script>
<style lang="scss">
::ng-deep .paypalcss .paypal-button.paypal-button-color-gold,
.paypal-button-row.paypal-button-color-gold .menu-button {
  background: #3862b5 !important;
}
</style>
