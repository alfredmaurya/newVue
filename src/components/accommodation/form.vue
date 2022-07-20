<template>
  <visi-dialog
    :dialog="dialog"
    :title="title"
    show-footer
    cardClass="q-card-md"
    :beforeShow="beforeShow"
    :loading="loading"
    :onHide="onHide"
    :onSubmit="onSubmit"
    :submitting="submitting"
  >
    <template v-slot:ScrollContent>
      <div class="form q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="form-field q-pb-none">
              <div class="alert bg-light-primary text-primary">
                *Required Fields
                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. -->
              </div>
            </div>
          </div>

          <div class="col-12 col-md-12">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.title"
                label="Accommodation Name*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-12">
            <div class="form-field__area q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.description"
                label="Description"
                type="textarea"
                autogrow
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-select
                outlined
                v-model="detail.location_id"
                label="Select Location*"
                lazy-rules
                :options="locationOptions"
                :rules="[$rules.required()]"
                option-label="title"
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterLocation"
                @input="onLocationChange"
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
              <q-select
                outlined
                v-model="detail.park_id"
                label="Select Park*"
                lazy-rules
                :options="parkOptions"
                :rules="[$rules.required()]"
                option-label="title"
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterPark"
                :loading="loadingParks"
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

          <div class="col-6 col-md-6">
            <div class="form-field q-pb-none">
              <q-toggle
                v-model="detail.status"
                label="Active"
                left-label
                :true-value="1"
                :false-value="0"
                checked-icon="check"
                unchecked-icon="clear"
                size="lg"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-select
                outlined
                v-model="detail.subtype_id"
                label="Select Subtype*"
                lazy-rules
                :options="subTypeOptions"
                :rules="[$rules.required()]"
                option-label="title"
                option-value="id"
                emit-value
                map-options
                use-input
                :loading="loadingSubtypes"
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

          <div class="col-12 col-md-12">
            <div class="form-field q-pb-none">
              <q-toggle
                v-model="detail.is_price_rule"
                label="Set Price Rule"
                left-label
                :true-value="1"
                :false-value="0"
                checked-icon="check"
                unchecked-icon="clear"
                size="lg"
              />
            </div>
          </div>

          <div class="col-12 col-md-12" v-if="detail.is_price_rule">
          
          <div class="row">
          <div class="col-md-6 text-left date-pick-col">  
          <div class="q-pa-md date-pick">
            <q-input filled v-model="start_date" mask="date" :rules="['date']" :label="`Rule Start Date:*`">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="start_date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          </div>
          <div class="col-md-6 date-pick-col">
          <div class="q-pa-md date-pick">
            <q-input filled v-model="end_date" mask="date" :rules="['date']" :label="`Rule End Date:*`">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="end_date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          </div>
          </div>
            <q-list bordered separator>
              <q-item
                class="q-py-md row q-col-gutter-sm"
                wrap
                style="flex-wrap: wrap !important"
                v-for="(priceRu, index) in priceRule"
                :key="`${index}`"
              >
                <div class="col-12 col-md-5">
                  <div class="form-field q-pb-none">
                    <q-select
                      outlined
                      v-model="priceRu.frequency"
                      :label="`Frequency*`"
                      lazy-rules
                      :rules="[$rules.required()]"
                      :options="Object.values(frequencyOptions)"
                      map-options
                      emit-value
                    />
                  </div>
                </div>
                
                <div class="col-12 col-md-3">
                  <div class="form-field q-pb-none">
                    <q-input
                      outlined
                      v-model="priceRu.rate"
                      label="Rate*"
                      prefix="$"
                      mask="#######"
                      lazy-rules
                      :rules="[
                        $rules.required(),
                        $rules.decimal('Enter valid Price.'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-1">
                  <div class="form-field q-pb-none">
                    <q-btn
                      :disabled="priceRule.length == 1"
                      unelevated
                      color="red"
                      size="14px"
                      padding="11px"
                      icon="delete"
                      @click="deleteRow(index)"
                    />
                  </div>
                </div>
              </q-item>

              <div class="q-px-md q-pb-md" v-if="numRule < 3">
                <q-btn
                  unelevated
                  no-caps
                  dense
                  size="12px"
                  padding="8px 16px"
                  color="secondary"
                  @click="addRow"
                >
                  <q-icon name="add" class="q-mr-sm" />Add Price Rule
                </q-btn>
              </div>
            </q-list>
          </div>
          <!--  -->
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import {date} from 'quasar'

function initialState() {
  var start_date = Date.now();
  var end_date = Date.now() + 3600*1000*24*3;

  start_date = date.formatDate(start_date, 'YYYY/MM/DD');
  end_date = date.formatDate(end_date, 'YYYY/MM/DD');

  return {

    dialog: 'AccommodationForm',
    title: 'Add Accommodation',
    frequencyOptions: {
      daily: {
        label: 'Daily',
        value: 1,
        extraLabel: 'Days',
      },
      weekly: {
        label: 'Weekly',
        value: 2,
        extraLabel: 'Weeks',
      },
      monthly: {
        label: 'Monthly',
        value: 3,
        extraLabel: 'Months',
      },
    },
    start_date: start_date,
    end_date: end_date,
    numRule: 1,
    priceRule: [
      {
        frequency: 1,
        rate: '',
      },
    ],
    detail: {
      title: '',
      description: '',
      park_id: '',
      location_id: '',
      status: 1,
      subtype_id: 0,
      is_price_rule: 0,
    },
    loading: false,
    submitting: false,
    locationOptions: [],
    parkOptions: [],
    subTypeOptions: [
      {id: 0, title: 'None'},
      {id: 1, title: 'RVS'},
      {id: 2, title: 'Cabins'}
    ],
    parks: {},
    loadingParks: false,
    loadingSubtypes: false,
  }
}
export default {
  name: 'AccommodationForm',
  data: initialState,
  computed: {
    ...mapGetters('common', ['locations']),
    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    addRow() {
      if (this.numRule < 3) {
        this.numRule += 1;
        this.priceRule.push({
          frequency: this.numRule,
          rate: '',
        })
      }
    },
    deleteRow(index) {
      if (this.priceRule && this.priceRule.length > 1) {
        this.priceRule.splice(index, 1);
        this.numRule -= 1;
      }
    },
    onLocationChange(locationId, showLoader = false) {
      if (!showLoader) this.detail.park_id = ''

      if (this.parks[locationId]) return this.parks[locationId]

      if (showLoader) {
        this.loading = true
      }
      this.loadingParks = true

      this.$store
        .dispatch('parks/getListing', {
          pagination: 0,
          location_id: locationId,
        })
        .then((response) => {
          if (response.status && response.data)
            this.parkOptions = this.parks[locationId] = response.data
        })
        .finally(() => {
          this.loadingParks = false
          this.loading = false
        })
    },
    filterLocation(val, update) {
      if (val === '') {
        update(() => {
          this.locationOptions = this.locations
          console.log(this.locationOptions);
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.locationOptions = this.locations.filter(
          (location) => location.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterPark(val, update) {
      let parks = this.parks[this.detail.location_id] || []

      if (val === '') {
        update(() => {
          this.parkOptions = parks
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.parkOptions = parks.filter(
          (location) => location.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    beforeShow() {
      if (this.properties.id) {
        this.title = 'Edit Accommodation'
        let detail = JSON.parse(JSON.stringify(this.properties))

        if (detail.price_rule && detail.price_rule.length) {
          this.priceRule = detail.price_rule;
          var date_from = detail.price_rule[0].date_from;
          var date_to = detail.price_rule[0].date_to;
          date_from = date_from.replaceAll('-', '/');
          date_to = date_to.replaceAll('-', '/');
          this.start_date = date_from;
          this.end_date = date_to;
          this.numRule = detail.price_rule.length;
        } else if (this.properties.rule && this.properties.price_rule.length) {
          this.priceRule = this.properties.price_rule;
          var date_from = this.properties.rule[0].date_from;
          var date_to = this.properties.rule[0].date_to;
          date_from = date_from.replaceAll('-', '/');
          date_to = date_to.replaceAll('-', '/');
          this.start_date = date_from;
          this.end_date = date_to;
          this.numRule = this.properties.price_rule.length;
        } 

        detail.is_price_rule =
          detail.price_rule && detail.price_rule.length ? 1 : 0

        this.detail = detail
        

        this.onLocationChange(detail.location_id, true)

        this.locationOptions = this.locations
      }

    },
    onHide() {
      Object.assign(this.$data, initialState())
    },
    onSubmit() {

      this.submitting = true

      let detail = {
        ...this.detail,
        priceRule: this.priceRule,
        date_from: this.start_date,
        date_to: this.end_date,
      }

      this.$store
        .dispatch('accommodation/addUpdate', detail)
        .then((response) => {
          if (response.status) {
            this.updateDialogState({
              dialog: 'AccommodationForm',
              val: false,
            })
            this.showSuccess(response.message)
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
  },
}
</script>

<style>
  .date-pick-col {
    margin: 0px;
    padding: 0px;
  }

  .date-pick {
    min-width: 110%; 
    margin-left: -5% !important;
    margin-bottom: -30px;
  }
</style>