<template>
  <visi-dialog
    :dialog="dialog"
    title="View Park"
    cardClass="q-card-md"
    :beforeShow="beforeShow"
    :loading="loading"
    remove-param-on-hide
  >
    <template v-slot:ScrollContent>
      <div class="form q-pa-md">
        <!-- {{ detail }} -->
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Park Name </span>
                  {{ detail.title || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Location</span>
                  {{
                    detail.location && detail.location.title
                      ? detail.location.title
                      : noDataPlaceHolder
                  }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Description</span>
                  {{ detail.description || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Status</span>
                  <q-badge
                    :class="
                      statues[detail.status] ? statues[detail.status].class : ''
                    "
                  >
                    {{
                      statues[detail.status]
                        ? statues[detail.status].status
                        : ''
                    }}
                  </q-badge>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Address</span>
                  {{ detail.address || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Zip Code</span>
                  {{ detail.zipcode || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Contact Phone</span>
                  {{ detail.mobile || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Contact Email</span>
                  {{ detail.email || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Park Managers</span>
                  <div
                    v-for="(parkEmployee, index) in detail.parkEmployee"
                    :key="index"
                  >
                    <template v-if="parkEmployee && parkEmployee.park_employee">
                      {{ parkEmployee.park_employee.first_name }}
                      {{ parkEmployee.park_employee.last_name }}
                    </template>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Facility</span>
                  <template v-if="detail.facility && detail.facility.length">
                    <div
                      v-for="(facility, index) in detail.facility"
                      :key="index"
                    >
                      <template v-if="facility && facility.title">
                        {{ facility.title }}
                      </template>
                    </div>
                  </template>
                  <template v-else>
                    {{ noDataPlaceHolder }}
                  </template>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Created At</span>
                  {{ detail.created_at | formatDate('H:mm A, MMM DD, YYYY') }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Created By</span>
                  <template v-if="detail.employee">
                    {{
                      `${detail.employee.first_name} ${detail.employee.last_name}`
                    }}
                  </template>
                  <template v-else>{{ noDataPlaceHolder }} </template>
                </div>
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
  name: 'ParkDetail',
  data() {
    return {
      dialog: 'ParkDetail',
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
    beforeShow() {
      if (this.properties.id) {
        this.loading = true
        this.$store
          .dispatch('parks/detailById', this.properties.id)
          .then((response) => {
            if (response.status && response.data) this.detail = response.data
            else
              this.updateDialogState({
                dialog: this.dialog,
                val: false,
              })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>
