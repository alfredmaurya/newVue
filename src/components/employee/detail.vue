<template>
  <visi-dialog
    :dialog="dialog"
    title="View Employee"
    cardClass="q-card-md"
    :beforeShow="beforeShow"
    :loading="loading"
    remove-param-on-hide
  >
    <template v-slot:ScrollContent>
      <div class="form q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="row q-col-gutter-md q-mb-lg items-center">
              <div class="col-12 col-md-auto">
                <Avtar
                  :userName="`${detail.first_name} ${detail.last_name}`"
                  :imageUrl="detail.profileImageUrl"
                  size="100px"
                />
              </div>
              <div class="col-12 col-md">
                <h3
                  class="text-h6 text-dark q-mt-none q-mb-sm"
                  v-text="`${detail.first_name} ${detail.last_name}`"
                />
                <q-btn
                  unelevated
                  no-caps
                  color="light-primary"
                  text-color="primary"
                  size="13px"
                  padding="5px 15px"
                  class="no-hover"
                >
                  <q-icon size="15px" name="password" class="q-mr-sm" /> Reset
                  Password
                </q-btn>

                <q-btn
                  unelevated
                  no-caps
                  color="light-primary"
                  text-color="primary"
                  size="13px"
                  padding="5px 15px"
                  label=""
                  class="q-ml-sm no-hover"
                >
                  <q-icon size="15px" name="person_remove" class="q-mr-sm" />
                  Delete User
                </q-btn>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-12">
            <div class="row q-col-gutter-md">
              <!-- -->
              <div class="col-12 col-md-12">
                <h3 class="text-h6 text-dark q-my-none">
                  Employee Information
                </h3>
              </div>
              <!-- -->
              <!-- -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>First Name </span>
                  {{ detail.first_name || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Last Name </span>
                  {{ detail.last_name || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Email </span>
                  {{ detail.email || noDataPlaceHolder }}
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Phone</span>
                  {{ detail.mobile || noDataPlaceHolder }}
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

              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Assigned Role</span>
                  {{
                    detail.role && detail.role.role_name
                      ? detail.role.role_name
                      : noDataPlaceHolder
                  }}
                </div>
              </div>
              <!--  -->

              <!--  -->
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Created At</span>
                  {{ detail.created_at | formatDate('H:mm A, MMM DD, YYYY') }}
                </div>
              </div>
              <!--  -->

              <!--  -->
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
              <!--  -->
            </div>
          </div>
        </div>
      </div>
    </template>
  </visi-dialog>
</template>

<script>
export default {
  name: 'EmployeeDetail',
  data() {
    return {
      dialog: 'EmployeeDetail',
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
          .dispatch('employee/detailById', this.properties.id)
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
