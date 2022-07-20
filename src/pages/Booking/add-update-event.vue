<template>
  <visi-dialog
    :dialog="dialog"
    :title="title"
    show-footer
    :onHide="onHide"
    :beforeShow="beforeShow"
    :onSubmit="onSubmit"
    :submitting="submitting"
    :submitLabel="submitLabel"
    :loading="fullLoading"
    :isOnBack="false"
    cardClass="q-card-lg"
  >
    <template v-slot:ScrollContent>
      <InnerLoadingSpinner :showing="loading" />
      <div class="form q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="form-field q-pb-none">
              <div class="alert bg-light-primary text-primary q-mb-none">
                *Required Fields
              </div>
            </div>
          </div>

          <!-- <div class="col-12 col-md-12">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                label="CITY / HOTEL / AREA / BUILDING"
                v-model="ttitle"
              />
            </div>
          </div> -->

          <div class="col-12 col-md-12">
            <div class="form-field form-field-large q-pb-none">
              <q-select
                outlined
                v-model="customer_id"
                label="Select Customer*"
                lazy-rules
                :options="customerOptions"
                :rules="[$rules.required()]"
                option-label="first_name"
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterCustomers"
                :readonly="!!properties.id"
              >
                <template v-slot:selected-item="scope">
                  <template v-if="scope && scope.opt">
                    {{ scope.opt.first_name }} {{ scope.opt.last_name }} ({{
                      scope.opt.email
                    }}) <br />
                    {{ scope.opt.phone_no }}
                    <br />
                    {{ scope.opt | formatAddress }}
                  </template>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label
                        v-html="
                          `${scope.opt.first_name} ${scope.opt.last_name}`
                        "
                      />
                      <q-item-label caption v-text="scope.opt.phone_no" />
                      <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                      <q-item-label caption>{{
                        scope.opt | formatAddress
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>

                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <div class="col-12 col-md-12 q-pt-none q-mb-xs text-right">
            <q-btn
              unelevated
              size="13px"
              color="primary"
              label="Add New Customer"
              v-if="hasPermission('customer_add') && title!=='Edit Booking'"
              class="q-mt-md"
              @click="
                updateDialogState({
                  dialog: 'CustomerForm',
                  val: true,
                  parentDialog: 'AddUpdateEvent',
                })
              "
            />
          </div>

          <div class="col-12 col-md-12">
            <div class="date-group">
              <div class="form-field">
                <!-- <q-datetime-range v-model="model" class="full-width" /> -->
                <span class="lab" v-if="model && typeof model == 'object'">
                  <span class="text-dark text-bold text-uppercase">
                    Check-In:
                  </span>
                  {{ model.from | formatDate }}
                </span>

                <q-btn
                  label="Change"
                  unelevated
                  class="no-hover underline"
                  color="primary"
                  size="12px"
                >
                  <q-popup-proxy
                    @before-show="updateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                   
                      v-model="proxyDate"
                      range
                      mask="YYYY/MM/DD"
                    >
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          @click="save"
                          v-close-popup
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </div>
              <div class="form-field">
                <span class="lab" v-if="model && typeof model == 'object'">
                  <span class="text-dark text-bold text-uppercase"
                    >Check-Out:
                  </span>
                  {{ model.to | formatDate }}
                </span>
                <q-btn
                  label="Change"
                  unelevated
                  class="no-hover underline"
                  color="primary"
                  size="12px"
                >
                  <q-popup-proxy
                    @before-show="updateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="proxyDate" range mask="YYYY/MM/DD">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          @click="save"
                          v-close-popup
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-12">
            <q-list bordered separator>
              <q-item
                class="q-py-md row"
                wrap
                v-for="(bookingDetail, index) in bookingDetails"
                :key="`${index}`"
                style="flex-wrap: wrap !important"
              >
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <div class="form-field q-pb-none">
                      <!-- {{bookingDetail.accommodation_id}} -->
                      <q-select
                        outlined
                        v-model="bookingDetail.accommodation_id"
                        label="Select Accommodation*"
                        lazy-rules
                        :options="accommodationOption"
                        :rules="[$rules.required()]"
                        option-label="title"
                        option-value="slug"
                        emit-value
                        map-options
                        use-input
                        @filter="filterAccommodation"
                        @input="
                          (val) => {
                            onAccommodation(val, false, index)
                          }
                        "
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-field q-pb-none">
                      <!-- {{"bud-s-place-cabin"+(bookingDetail.accommodation_type_id)}} -->
                      <q-select
                        outlined
                        v-model="bookingDetail.accommodation_type_id"
                        label="Select Accommodation Type*"
                        lazy-rules
                        :options="bookingDetail.accommodationTypeOption"
                        :rules="[$rules.required(),(val)=>AccommodationTypeValidator(val)||'Accommodation Type aleardy booked']"
                        option-label="title"
                        option-value="slug"
                        emit-value
                        map-options
                        @input="calculatePrice"
                        :loading="!!bookingDetail.loading"
                        :disable="!!bookingDetail.loading"
                      >
                        <template v-slot:option="scope">
                          <q-item
                            v-bind="scope.itemProps"
                            v-on="scope.itemEvents"
                          >
                            {{ scope.opt.title }}
                            <template v-if="scope.opt.inMaintainance">
                              (Maintenance)
                            </template>
                             <template v-if="scope.opt.doneBooking">
                               (Booked)
                             </template>
                          </q-item>
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-field q-pb-none">
                      <q-input
                        outlined
                        v-model.trim="bookingDetail.no_of_guest"
                        :label="`No Of Guest ${
                          getMaxAllowedGuest(index)
                            ? `(Max ${getMaxAllowedGuest(index)} Allowed)`
                            : ''
                        }`"
                        lazy-rules
                        mask="##"
                        :rules="[
                          $rules.required(),
                          $rules.maxValue(
                            getMaxAllowedGuest(index) || 99,
                            `Only ${
                              getMaxAllowedGuest(index) || 99
                            } Guest allowed for Accommodation`
                          ),
                        ]"
                      />
                    </div>
                  </div>

                  <div class="col-12 col-md-6">
                    <div class="form-field q-pb-none">
                      <q-btn
                        :disabled="bookingDetails.length == 1"
                        unelevated
                        color="red"
                        size="14px"
                        padding="11px"
                        icon="delete"
                        @click="deleteRow(index)"
                      />
                    </div>
                  </div>
                </div>
              </q-item>
              <div class="q-px-md q-pb-md">
                <q-btn
                  unelevated
                  no-caps
                  dense
                  size="12px"
                  padding="8px 16px"
                  color="secondary"
                  @click="addRow"
                >
                  <q-icon name="add" class="q-mr-sm" />Add Accommodation
                </q-btn>
              </div>
            </q-list>
          </div>

     
          <div  v-if="existingBookingList.length!==0" class="col-12 col-md-12">
            <div style="paddingBottom:5px">Existing Booking List</div>
            <q-list bordered separator>
                <table class="qtable" style="width: 100%">
                <tr>
                <td>
                  Customer Name
                </td>
                <td>Accommodation Type</td>
                <td>Start Date</td>
                <td>End Date</td>
              </tr>
              <tr v-for="existingBookingList in existingBookingList" :key="existingBookingList.id">
                <td style="fontSize:14px">
                  {{existingBookingList.customer.first_name+" "+existingBookingList.customer.last_name}}
                </td>
                <td style="fontSize:14px">{{existingBookingList.detail[0].accommodation_type.slug}}</td>
                <td style="fontSize:14px">{{existingBookingList.start|formatDate}}</td>
                <td style="fontSize:14px">{{existingBookingList.end|formatDate}}</td>
              </tr>
              </table>
            </q-list>
          </div>

          <div class="col-12 col-md-12">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="discount"
                label="Discount Percentage"
                lazy-rules
                mask="##"
                suffix="%"
                @input="calculatePrice"
              />
            </div>
          </div>
          <!-- {{ priceData }} -->
          <!--  -->
          <div class="col-12 col-md-12">
            <table class="qtable" style="width: 100%">
              <tr>
                <td>
                  <span> <label>Total Rate </label> </span></td
                >
                <td> {{ priceData.total_rate | currency }}</td>
              </tr>

              <tr>
                <td>
                  <span> <label>Discount </label> </span></td
                >
                <td>- {{ priceData.discountAmount | currency }}</td>
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
              <tr v-for="tax of priceData.taxes" :key="tax.id">
                <td>
                  <span>
                    <label>{{ tax.tax_name }} ({{ tax.tax_per }}%) </label>
                  </span></td
                >
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
              <tr v-if="title==='Edit Booking'">
                <td>
                  <span> <label>Exisiting Booking Charges</label> </span>
                </td>
                <td> -{{ existingbill_amount | currency }}</td>
              </tr>
              <tr v-if="title==='Edit Booking'">
                <td colspan="2">
                  <hr role="separator" aria-orientation="horizontal" class="
                      q-separator q-mt-sm q-separator q-separator--horizontal
                    " />
                </td>
              </tr>
              <tr>
                <td>
                  <span> <label>Total </label> </span>
                </td>
                <td v-if="title==='Edit Booking'"> {{ priceData.bill_amount-existingbill_amount | currency }}</td>
                <td v-else> {{ priceData.bill_amount | currency }}</td>
              </tr>
            </table>
            <!-- <q-separator class="q-mt-sm" /> -->
          </div>
          <!--  -->
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'

function initialState() {
  return {
    show: false,
    submitLabel: 'Checkout',
    dialog: 'AddUpdateEvent',
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
    bookings:{},
    validationListBooking:{},
    customerName:'',
    customerEmail:'',
    actualStartDate: '',
    actualEndDate: '',
    existingBookingList: [],
    existingbill_amount:'',
    bookings_total:[],
  }
}
export default {
  name: 'AddUpdateEvent',
  props: ['parkId', 'updateEvent', 'accommodation', 'clearSelection'],
  data: initialState,
  watch: {
    customers: function (newVal, OldVal) {
      this.customerOptions = newVal || []
    },
  },
  computed: {
    ...mapGetters('common', ['customers']),
    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    timeZone(data){
      let splitDob=data.split('-')
        return `${splitDob[1]}/${splitDob[2]}/${splitDob[0]}`
        
    },
    futureDatesOption(date, includeToday = true) {
      if (includeToday) return date >= this.formatDate(new Date(), 'YYYY/MM/DD')
      return date > this.formatDate(new Date(), 'YYYY/MM/DD')
    },
    AccommodationTypeValidator(val){
      if(this.validationListBooking.hasOwnProperty(val)){
        return false
      }else{
        return true
      }
    },
    getMaintenanceList() {
      let { formData, data } = this.requestObject()

      this.loading = true

      this.$store
        .dispatch('crud/getListing', {
          module: 'accommodation_type/maintenance/list',
          params: data,
        })
        .then((data) => {
          if (data.status) {
            this.maintenance = this.convertArrayToObject(
              data.data,
              'accommodation_type_id'
            )          
            this.getBookings()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getBookings(){
       let {  data } = this.requestObject()
       this.loading = true
      this.$store
        .dispatch('bookings/getBooking', {
          park_id: data.parkId,
          from_date: data.from_date,
          to_date: data.to_date,
          booking_type:'booked',
          pagination: 0,
        })
        .then((result) => {
          if (result.status && result.data) {
            if (result.data.bookingList) {
              let bookings = {}
              let exitingList = []
              //let bookings_total=[]

              result.data.bookingList.forEach((booking) => {
                booking.detail.forEach((det,i) => {
                  bookings[det.accommodation_type_id] = {...booking.detail[i],'customer_id':booking.customer_id}
                  // bookings_total.push({})
                  this.bookingDetails.forEach((j)=>{
                     if (j['accommodation_type_id'] === det.accommodation_type.slug) {
                          exitingList.push(booking)
                      }
                  })
                })
              })
              this.bookings_total=result.data.bookingList
              this.existingBookingList = exitingList
              this.bookings = bookings
              this.filterAccommodationType()
            }
          }
        })
        .finally(() => {
          this.loading = false
          //this.hideShowFullSpinner(false)
        })
    },
    filterAccommodationType() {
      this.validationListBooking = {}
      this.bookingDetails.forEach((bookingDetail) => {
        bookingDetail.accommodationTypeOption =
          bookingDetail.accommodationTypeOption.map((accommodationType) => {
             if(this.maintenance.hasOwnProperty(accommodationType.id)||this.bookings.hasOwnProperty(accommodationType.id)){
              // this.validationListBooking.push(accommodationType.slugaccommodationType.slug)
              this.bookings_total.forEach((k)=>{
                if(k.detail[0].accommodation_type_id===accommodationType.id){
                    if(this.properties.title&&this.customer_id!==k.customer_id){
                      this.validationListBooking = { ...this.validationListBooking, [accommodationType.slug]: accommodationType.slug }
                    }else if(!this.properties.title){
                    this.validationListBooking = { ...this.validationListBooking, [accommodationType.slug]: accommodationType.slug }
                    }
                }
              })
               
             
            } 
            return {
              ...accommodationType,
              disable: this.maintenance.hasOwnProperty(accommodationType.id)||this.bookings.hasOwnProperty(accommodationType.id),
              doneBooking:this.bookings.hasOwnProperty(accommodationType.id),
              inMaintainance: this.maintenance.hasOwnProperty(accommodationType.id)
            }
          })
      })
      this.loading = false
    },
    deleteRow(index) {
      if (this.bookingDetails && this.bookingDetails.length > 1)
        this.bookingDetails.splice(index, 1)
         this.calculatePrice()
    },
    addRow() {
      this.bookingDetails.push({
        accommodation_id: '',
        accommodation_type_id: '',
        no_of_guest: '',
        accommodationTypeOption: [],
      })
    },
    getMaxAllowedGuest(index) {
      let accommodationType =
        this.accommodationType[this.bookingDetails[index].accommodation_id] ||
        []

      if (this.bookingDetails[index].accommodation_type_id) {
        let accType = accommodationType.find(
          (o) => o.slug === this.bookingDetails[index].accommodation_type_id
        )
        if (accType) return accType.to_people
      }
    },
    filterCustomers(val, update) {
      if (val === '') {
        update(() => {
          this.customerOptions = this.customers
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.customerOptions = this.customers.filter(
          (customer) =>
            customer.first_name.toLowerCase().indexOf(needle) > -1 ||
            customer.last_name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    async onAccommodation(val, shoFullLoader = false, index, clearType = true) {
      if (clearType) this.bookingDetails[index].accommodation_type_id = ''
      if (this.accommodationType[val]) {
        this.bookingDetails[index]['accommodationTypeOption'] =
          this.accommodationType[val]

        this.filterAccommodationType()
        return
      }

      // this.bookingDetails[index] = {
      //   ...this.bookingDetails[index],
      //   loading: true,
      // }
      // this.bookingDetails[index].loading = true
      this.loading = true

      if (shoFullLoader) this.fullLoading = true
      await this.$store
        .dispatch('accommodationType/getListing', {
          pagination: 0,
          park_id: this.parkId,
          accommodation_slug: val,
        })
        .then((response) => {
          if (response.status && response.data) {
            this.accommodationType[val] = response.data
            this.bookingDetails[index]['accommodationTypeOption'] =
              response.data
          }

          this.filterAccommodationType()
        })
        .finally(() => {
          // this.bookingDetails[index] = {
          //   ...this.bookingDetails[index],
          //   loading: false,
          // }
          this.loading = false

          this.fullLoading = false
        })

      this.calculatePrice()
    },
    filterAccommodation(val, update) {
      if (val === '') {
        update(() => {
          this.accommodationOption = this.accommodation
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.accommodationOption = this.accommodation.filter(
          (customer) => customer.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    async beforeShow() {
      console.log(this.properties,"test")
      
      if(this.properties.bill_amount){
        this.existingbill_amount=this.properties.bill_amount
      }
      if(this.properties.data){
         
          this.show=true
          
           this.model = {
          from: date.formatDate(this.properties.data.start, 'YYYY-MM-DD'),
          to: date.formatDate(this.timeZone(this.properties.data.end), 'YYYY-MM-DD'),
        }
      
          this.customer_id=this.properties.data.customer_id
          this.customerOptions=this.properties.customerOptions
          this.bookingDetails=this.properties.bookingDetails
          this.discount=this.properties.data.discount
          this.getMaintenanceList()
          this.calculatePrice()
          this.show=false
      }
      else{
      this.show = true
      this.$root.$on('customer-added-modified', (customer) => {
        if (this.show) {
          setTimeout(() => {
            this.customer_id = customer.id
          }, 200)
        }
      })

      if (this.properties.id) {
        this.submitLabel = 'Modify Booking'
        this.title = 'Edit Booking'
      }

      if (this.properties.startStr && this.properties.endStr) {
        this.model = {
          from: date.formatDate(this.properties.startStr, 'YYYY-MM-DD'),
          to: date.formatDate(this.timeZone(this.properties.endStr), 'YYYY-MM-DD'),
        }
        this.getMaintenanceList()
      }

      if (this.properties.customer_id)
        this.customer_id = this.properties.customer_id

      if (this.properties.discount) this.discount = this.properties.discount

      this.accommodationOption = this.accommodation || []

      if (
        this.properties.selected &&
        Object.keys(this.properties.selected).length
      ) {
        this.bookingDetails = []
        let index = 0
        for (const key in this.properties.selected) {
          this.bookingDetails.push({
            accommodation_id: this.properties.selected[key],
            accommodation_type_id: key,
            no_of_guest: '',
            accommodationTypeOption: [],
            loading: false,
          })

          await this.onAccommodation(
            this.properties.selected[key],
            true,
            index,
            false
          )
          index += 1
        }
      }

      if (this.properties.accommodation) {
        this.accommodation_id = this.bookingDetails[0]['accommodation_id'] =
          this.properties.accommodation

        this.onAccommodation(this.properties.accommodation, true, 0)
      }

      if (this.properties.accommodation_type)
        this.bookingDetails[0]['accommodation_type_id'] =
          this.properties.accommodation_type

      if (this.properties.detail) {
        this.bookingDetails = []

        this.properties.detail.forEach(async (det, index) => {
          this.bookingDetails.push({
            accommodation_id: det.accommodation.slug,
            accommodation_type_id: det.accommodation_type.slug,
            no_of_guest: det.no_of_guest,
            accommodationTypeOption: [],
            loading: false,
          })
          await this.onAccommodation(det.accommodation.slug, true, index, false)
        })
      }

      this.customerOptions = this.customers
      this.calculatePrice()
      }
    },
    calculatePrice() {
      let { formData, data } = this.requestObject()

      if (data.detail && data.detail.length) {
        this.loading = true
        this.$store
          .dispatch('bookings/calculatePrice', data)
          .then((result) => {
            if (result.status) this.priceData = result.data
          })
          .finally(() => {
            this.loading = false
          })
      } else this.priceData = {}
    },
    updateProxy() {
      this.proxyDate = this.model
    },
    save() {
      if (this.proxyDate) {
        if (typeof this.proxyDate == 'object') this.model = this.proxyDate
        else {
          this.model = {
            from: this.proxyDate,
            to: date.formatDate(
              date.addToDate(this.proxyDate, { days: 1 }),
              'YYYY/MM/DD'
            ),
          }
        }
      }

      this.getMaintenanceList()

      this.calculatePrice()
    },
    onHide() {
      if (!this.updated && this.properties.oldEvent)
        this.updateEvent(this.properties.oldEvent)

      Object.assign(this.$data, initialState())

      this.clearSelection()
    },
    requestObject() {
      let data = {
        customer_id: this.customer_id,
        park_id: this.parkId,
        discount: this.discount || 0,
        detail: [],
      }

      this.bookingDetails.forEach((bookingDetail) => {
        if (
          bookingDetail.accommodation_id &&
          bookingDetail.accommodation_type_id
          // && bookingDetail.no_of_guest
        )
          data['detail'].push({
            accommodation_id: bookingDetail.accommodation_id,
            accommodation_type_id: bookingDetail.accommodation_type_id,
            no_of_guest: bookingDetail.no_of_guest || 0,
          })
      })

      if (this.properties.id) data['id'] = this.properties.id

      // console.log(this.model)

      if (typeof this.model == 'object' && this.model.from) {
        data['start'] = data['from_date'] = this.model.from
        data['end'] = data['to_date'] = this.model.to
      } else {
        // data['end'] =
        //   data['start'] =
        //   data['from_date'] =
        //   data['to_date'] =
        // this.model
        // console.log(this.model)
      }

      let formData = new FormData()

      for (let key in data) formData.append(key, data[key])

      return { formData, data }
    },
    onSubmit() {
      this.submitting = true

      this.submitting = true
      let { data } = this.requestObject()
      // console.log(this.properties,"testingggg",this.title)
      if(this.title==="Edit Booking"){
         this.updateDialogState({
              dialog: 'PaymentEdit',
              val: true,
              properties: {
                ...this.properties,
                price: this.priceData,
                order:data,
                bookingDetails:this.bookingDetails,
                customerOptions:this.customerOptions,
                initialState:initialState,
                // startStr: startStr,
                // endStr: this.formatDate(endDate, 'YYYY-MM-DD'),
                // accommodation: canBook ? canBook.dataset.acc : '',
                // accommodation_type: canBook ? canBook.dataset.accType : '',
                // selected: this.selected,
              },
            })
      }else{
        this.updateDialogState({
              dialog: 'Payment',
              val: true,
              properties: {
                price: this.priceData,
                order:data,
                bookingDetails:this.bookingDetails,
                customerOptions:this.customerOptions,
                initialState:initialState,
                // startStr: startStr,
                // endStr: this.formatDate(endDate, 'YYYY-MM-DD'),
                // accommodation: canBook ? canBook.dataset.acc : '',
                // accommodation_type: canBook ? canBook.dataset.accType : '',
                // selected: this.selected,
              },
            })
      }

     

      // this.$store
      //   .dispatch('bookings/addUpdate', data)
      //   .then((response) => {
      //     if (response.status) {
      //       this.updateDialogState({
      //         dialog: 'Payment',
      //         val: true,
      //         properties: {
      //           price: this.priceData,
      //           order: response.data,
      //           // startStr: startStr,
      //           // endStr: this.formatDate(endDate, 'YYYY-MM-DD'),
      //           // accommodation: canBook ? canBook.dataset.acc : '',
      //           // accommodation_type: canBook ? canBook.dataset.accType : '',
      //           // selected: this.selected,
      //         },
      //       })
      //       // this.updated = true

      //       // this.updateDialogState({
      //       //   dialog: this.dialog,
      //       //   val: false,
      //       // })

      //       // this.showSuccess(response.message)

      //       // if (this.updateEvent) this.updateEvent(response.data)
      //     } else if (response.message) {
      //       if (typeof response.message === 'object') {
      //         for (const k in response.message) {
      //           this.showError(response.message[k])
      //         }
      //       } else if (
      //         typeof response.message === 'string' ||
      //         response.message instanceof String
      //       ) {
      //         this.showError(response.message)
      //       }
      //     }
      //   })
      //   .finally(() => {
      //     this.submitting = false
      //   })
    },
  },
}
</script>

<style lang="scss">
.qtable {
  width: 100%;
}
/* .orderSummaryTotal {
  padding-bottom: 15px;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      padding: 6px 0;
      font-size: 16px;
      font-weight: normal;
      color: #0f141a;
      position: relative;
      text-align: right;
      @media (max-width: 374px) {
        font-size: 14px;
      }
      span {
        font-weight: normal;
        width: 200px;
        position: absolute;
        left: 0;
        top: 6px;
        text-align: left;
        color: #333;
      }
      &.total {
        margin-top: 8px;
        padding: 15px 0 5px;
        border-top: 1px solid rgba(112, 112, 112, 0.25);
        font-size: 18px;
        font-weight: 700;
        color: #314154;
        span {
          top: 15px;
          font-weight: 700;
        }
      }
    }
  }
} */
.date-group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border: 1px solid #e5eaee;
  border-radius: 4px;
  .form-field {
    position: relative;
    padding: 16px;
    flex: 1 0 50%;
    border-right: 1px solid #e5eaee;
    .lab {
      font-size: 16px;
      color: $primary;
      span {
        font-size: 11px;
        display: block;
      }
    }
    .q-btn {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
    }
    &:last-child {
      border-right: none;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    .form-field {
      border-right: none;
      border-bottom: 1px solid #e5eaee;
    }
  }
}
.orderSummaryTotal {
  padding: 16px;
  background: $primary;
  color: #fff;
  border-radius: 4px;
  ul {
    margin-top: 12px;
    background: #fff;
    color: #333;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    border: 1px solid #e5eaee;
    border-right: none;
    border-radius: 4px;
    overflow: hidden;
    li {
      padding: 12px;
      flex: 1 0 auto;
      border-right: 1px solid #e5eaee;
      color: #000;
      font-size: 18px;
      span {
        display: block;
        font-size: 12px;
        color: $primary;
      }
      &.total {
        color: $primary;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
