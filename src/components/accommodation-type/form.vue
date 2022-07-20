<template>
  <visi-dialog
    :dialog="dialog"
    :title="title"
    show-footer
    cardClass="q-card-lg"
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

          <div class="col-12 col-md-4">
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

          <div class="col-12 col-md-4">
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

          <div class="col-12 col-md-4">
            <div class="form-field q-pb-none">
              <q-select
                outlined
                v-model="detail.accommodation_id"
                label="Select Accommodation*"
                lazy-rules
                :options="accommodationOption"
                :rules="[$rules.required()]"
                option-label="title"
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterAccommodation"
                :loading="loadingAccommodation"
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
              <q-input
                outlined
                v-model.trim="detail.title"
                label="Accommodation Type Name*"
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
            <div class="form-field__area q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.rate"
                label="Rate*"
                lazy-rules
                prefix="$"
                mask="#######"
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field__area q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.to_people"
                label="People*"
                mask="#"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <!-- <div class="col-12 col-md-12">
            <q-list bordered separator>
              <q-item
                class="q-py-md row"
                wrap
                style="flex-wrap: wrap !important"
                v-for="(priceRu, index) in priceRule"
                :key="`${index}`"
              >
                <div class="col-12 col-md-4">
                  <div class="form-field q-pb-none">
                    <q-input
                      outlined
                      v-model="priceRu.days"
                      :label="`Days*`"
                      lazy-rules
                      :rules="[$rules.required()]"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-4 q-ml-sm">
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

                <div class="col-12 col-md-3 q-ml-sm">
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
                  <q-icon name="add" class="q-mr-sm" />Add Price Rule
                </q-btn>
              </div>
            </q-list>
          </div> -->
          <div class="col-12 col-md-12">
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
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
function initialState() {
  return {
    dialog: 'AccommodationTypeForm',
    title: 'Add Accommodation Type',
    detail: {
      location_id: '',
      park_id: '',
      accommodation_id: '',
      title: '',
      description: '',
      from_people: 1,
      to_people: 5,
      rate: '',
      status: 1,
      max_people:5,
    },
    // priceRule: [
    //   {
    //     days: '',
    //     rate: '',
    //   },
    // ],
    loading: false,
    submitting: false,
    locationOptions: [],
    parkOptions: [],
    parks: {},
    loadingParks: false,
    accommodationOption: [],
    loadingAccommodation: false,
    accommodation: {},
  }
}
export default {
  name: 'AccommodationTypeForm',
  data: initialState,
  computed: {
    ...mapGetters('common', ['locations']),
    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    // addRow() {
    //   this.priceRule.push({
    //     days: '',
    //     rate: '',
    //   })
    // },
    // deleteRow(index) {
    //   if (this.priceRule && this.priceRule.length > 1)
    //     this.priceRule.splice(index, 1)
    // },
    onLocationChange(locationId) {
      this.detail.park_id = ''

      if (this.parks[locationId]) return this.parks[locationId]

      this.loadingParks = true

      this.$store
        .dispatch('parks/getListing', {
          pagination: 0,
          location_id: locationId,
        })
        .then((response) => {
          if (response.status && response.data) {
            this.parks[locationId] = response.data
            this.parkOptions = response.data
          }
        })
        .finally(() => {
          this.loadingParks = false
        })
    },
    onParkChange(parkId) {
      this.detail.accommodation_id = ''

      if (this.accommodation[parkId]) return this.accommodation[parkId]

      this.loadingAccommodation = true

      this.$store
        .dispatch('accommodation/getListing', {
          pagination: 0,
          park_id: parkId,
        })
        .then((response) => {
          if (response.status && response.data)
            this.accommodation[parkId] = response.data
          this.accommodationOption = response.data
        })
        .finally(() => {
          this.loadingAccommodation = false
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
    filterAccommodation(val, update) {
      let accommodation = this.accommodation[this.detail.park_id] || []

      if (val === '') {
        update(() => {
          this.accommodationOption = accommodation
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.accommodationOption = accommodation.filter(
          (accom) => accom.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    beforeShow() {
      this.locationOptions = this.locations

      if (this.properties.id) {
        this.loading = true
        this.title = 'Edit Accommodation Type'

        this.$store
          .dispatch('accommodationType/detailById', this.properties.id)
          .then((response) => {
            if (response.status && response.data) {
              this.detail = response.data

              if (!this.detail.rule)
                this.priceRule = [
                  {
                    days: '',
                    rate: '',
                  },
                ]
              else this.priceRule = this.detail.rule

              this.onLocationChange(this.detail.location_id)

              if (this.detail && this.detail.park)
                this.detail.park_id = this.detail.park.id

              this.onParkChange(this.detail.park_id)

              if (this.detail && this.detail.accommodation)
                this.detail.accommodation_id = this.detail.accommodation.id
            }
          })
          .finally(() => {
            this.loading = false
          })
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
      }
      detail.max_people=detail.to_people

      this.$store
        .dispatch('accommodationType/addUpdate', detail)
        .then((response) => {
          if (response.status) {
            this.updateDialogState({
              dialog: 'AccommodationTypeForm',
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
