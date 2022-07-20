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
              </div>
            </div>
          </div>

          <div class="col-12 col-md-12">
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

          <div class="col-12 col-md-12">
            <div class="form-field q-pb-none">
              <q-select
                outlined
                v-model="detail.facility"
                label="Select Facility*"
                lazy-rules
                :options="facilitysOptions"
                :rules="[$rules.required()]"
                option-label="title"
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterFacility"
                multiple
                use-chips
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
              <q-select
                outlined
                v-model="detail.park_manager"
                label="Select Park Manager*"
                lazy-rules
                :options="employeesOptions"
                :rules="[$rules.required()]"
                :option-label="
                  (node) => (node ? `${node.first_name} ${node.last_name}` : '')
                "
                use-chips
                multiple
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterEmployee"
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
                label="Park Name*"
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
          <div class="col-12 col-md-12">
            <div class="form-field__area q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.address"
                label="address*"
                type="textarea"
                autogrow
              />
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.zipcode"
                label="Zip Code*"
                mask="#####"
                lazy-rules
                :rules="[$rules.required(), $rules.validateZip()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.email"
                label="Contact Email*"
                lazy-rules
                :rules="[$rules.required(), $rules.email()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.mobile"
                label="Contact Phone*"
                mask="(###)-###-####"
                lazy-rules
                :rules="[$rules.required(), $rules.validatePhone()]"
              />
            </div>
          </div>

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
    dialog: 'ParkForm',
    title: 'Add Park',
    detail: {
      title: '',
      description: '',
      address: '',
      mobile: '',
      zipcode: '',
      email: '',
      location_id: '',
      park_manager: [],
      facility_id: [],
      status: 1,
    },
    loading: false,
    submitting: false,
    locationOptions: [],
    employeesOptions: [],
    facilitysOptions: [],
  }
}

export default {
  name: 'ParkForm',
  data: initialState,
  computed: {
    properties() {
      return this.getDialogProperties(this.dialog)
    },
    ...mapGetters('common', ['locations', 'employees', 'facilitys']),
  },
  methods: {
    filterEmployee(val, update) {
      if (val === '') {
        update(() => {
          this.employeesOptions = this.employees
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.employeesOptions = this.employees.filter(
          (employee) =>
            employee.first_name.toLowerCase().indexOf(needle) > -1 ||
            employee.last_name.toLowerCase().indexOf(needle) > -1
        )
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
    filterFacility(val, update) {
      if (val === '') {
        update(() => {
          this.facilitysOptions = this.facilitys
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.facilitysOptions = this.facilitys.filter(
          (facility) => facility.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    beforeShow() {
      if (this.properties.id) {
        this.title = 'Edit Park'

        this.locationOptions = this.locations
        this.employeesOptions = this.employees
        this.facilitysOptions = this.facilitys

        this.loading = true
        this.$store
          .dispatch('parks/detailById', this.properties.id)
          .then((response) => {
            if (response.status) {
              let detail = response.data

              this.detail = {
                ...detail,
                facility: detail.facility.reduce((arr, item) => {
                  arr.push(item.id)
                  return arr
                }, []),
                park_manager: detail.parkEmployee.reduce((arr, item) => {
                  arr.push(item.employee_id)
                  return arr
                }, []),
              }
            }
          })
          .finally(() => {
            this.loading = false
          })
        // this.detail = JSON.parse(JSON.stringify(this.properties))
      }
    },
    onHide() {
      Object.assign(this.$data, initialState())
    },
    onSubmit() {
      this.submitting = true

      this.$store
        .dispatch('parks/addUpdate', this.detail)
        .then((response) => {
          if (response.status) {
            this.updateDialogState({
              dialog: 'ParkForm',
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
