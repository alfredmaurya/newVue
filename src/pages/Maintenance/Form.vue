<template>
  <visi-dialog
    :dialog="dialog"
    :title="title"
    show-footer
    :loading="loading"
    :beforeShow="beforeShow"
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
              </div>
            </div>
          </div>

          <!--  -->
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
          <!--  -->

          <!--  -->
          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-select
                outlined
                v-model="detail.park_id"
                label="Select Park*"
                lazy-rules
                :options="parkOptions"
                option-label="title"
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterPark"
                @input="onParkChange"
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
          <!--  -->

          <!--  -->
          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-select
                outlined
                v-model="detail.accommodation_id"
                label="Select Accommodation*"
                lazy-rules
                :options="accommodation"
                option-label="title"
                option-value="id"
                map-options
                emit-value
                @input="onAccommodation"
                :loading="loadingAccommodation"
                :disabled="loadingAccommodation"
              />
            </div>
          </div>
          <!--  -->

          <!--  -->
          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-select
                outlined
                v-model="detail.accommodation_type_id"
                label="Select Accommodation Type*"
                lazy-rules
                :options="accommodationType"
                option-label="title"
                option-value="id"
                emit-value
                map-options
                :loading="loadingAccommodationType"
                :disabled="loadingAccommodationType"
              />
            </div>
          </div>
          <!--  -->

          <!--  -->
          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.start_date"
                label="Start Date* (DD/MM/YYYY)"
                lazy-rules
                mask="##/##/####"
                :rules="[
                  $rules.required(),
                  $rules.isValidDate(),
                  $rules.onlyFutureDates(),
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="detail.start_date"
                        mask="DD/MM/YYYY"
                        :options="futureDatesOption"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <!--  -->

          <!--  -->
          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.end_date"
                label="End Date* (DD/MM/YYYY)"
                lazy-rules
                mask="##/##/####"
                :rules="[
                  $rules.required(),
                  $rules.isValidDate(),
                  $rules.onlyFutureDates(),
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="detail.end_date"
                        mask="DD/MM/YYYY"
                        :options="futureDatesOption"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <!--  -->

          <!--  -->
          <div class="col-12 col-md-12">
            <div class="form-field__area q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.notes"
                label="Additional notes"
                lazy-rules
                type="textarea"
                autogrow
              />
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </template>
  </visi-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

function initialState() {
  return {
    dialog: 'MaintenanceForm',
    title: 'Add Maintenance',
    loading: false,
    submitting: false,
    loadingAccommodation: false,
    loadingAccommodationType: false,
    locationOptions: [],
    parkOptions: [],
    accommodation: [],
    accommodationType: [],
    detail: {
      location_id: '',
      park_id: '',
      accommodation_id: '',
      accommodation_type_id: '',
      start_date: '',
      end_date: '',
      notes: '',
    },
  }
}

export default {
  name: 'MaintenanceForm',
  data: initialState,
  props: {
    parks: {
      type: Array,
      default: new Array(),
    },
  },
  computed: {
    properties() {
      return this.getDialogProperties(this.dialog)
    },
    ...mapGetters('common', ['locations']),
  },
  methods: {
    beforeShow() {
      this.parkOptions = this.parks
      this.locationOptions = this.locations
      if (this.properties.id) {
        this.title = 'Edit Maintenance'

        let detail = JSON.parse(JSON.stringify(this.properties))

        if (detail.start_date)
          detail.start_date = this.formatDate(detail.start_date, 'DD/MM/YYYY')

        if (detail.end_date)
          detail.end_date = this.formatDate(detail.end_date, 'DD/MM/YYYY')

        this.loading = true
        let promises = []
        promises.push(this.onParkChange(detail.park_id))
        promises.push(this.onAccommodation(detail.accommodation_id))

        Promise.all(promises).finally(() => {
          this.loading = false
        })

        this.detail = detail
      }
    },
    onHide() {
      Object.assign(this.$data, initialState())
    },
    onSubmit() {
      this.submitting = true

      let detail = { ...this.detail }

      if (detail.start_date) {
        let splitDate = detail.start_date.split('/')
        detail.start_date = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
      }

      if (detail.end_date) {
        let splitDate = detail.end_date.split('/')
        detail.end_date = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
      }

      this.$store
        .dispatch('crud/addUpdate', {
          body: detail,
          module: 'accommodation_maintenance',
        })
        .then((response) => {
          if (response.status) {
            this.updateDialogState({
              dialog: this.dialog,
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
    filterLocation(val, update) {
      if (val === '') {
        update(() => {
          this.locationOptions = this.locations
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
      let parks = this.parks

      if (val === '')
        return update(() => {
          this.parkOptions = parks
        })

      update(() => {
        const needle = val.toLowerCase()
        this.parkOptions = parks.filter(
          (park) => park.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    onParkChange(val) {
      this.loadingAccommodation = true
      return this.$store
        .dispatch('crud/getListing', {
          module: 'accommodation',
          params: {
            pagination: 0,
            park_id: val,
          },
        })
        .then((data) => {
          if (data.status) this.accommodation = data.data
        })
        .finally(() => {
          this.loadingAccommodation = false
        })
    },
    onAccommodation(val) {
      this.loadingAccommodationType = true
      return this.$store
        .dispatch('crud/getListing', {
          module: 'accommodation_type',
          params: {
            pagination: 0,
            park_id: this.detail.park_id,
            accommodation_id: val,
          },
        })
        .then((data) => {
          if (data.status) this.accommodationType = data.data
        })
        .finally(() => {
          this.loadingAccommodationType = false
        })
    },
  },
}
</script>
