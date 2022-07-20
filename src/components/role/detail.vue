<template>
  <visi-dialog
    :dialog="dialog"
    title="View Role"
    cardClass="q-card-md"
    :beforeShow="beforeShow"
    :loading="loading"
    remove-param-on-hide
  >
    <template v-slot:ScrollContent>
      <div class="form q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Role Name </span>
                  {{ detail.role_name || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Role Key </span>
                  {{ detail.role_key || noDataPlaceHolder }}
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
                  <span>Description</span>
                  {{ detail.description || noDataPlaceHolder }}
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

              <div class="col-12 col-md-12" v-if="false">
                <h3 class="text-subtitle1 text-bold q-my-none">
                  Permission(s)
                </h3>
              </div>

              <div class="col-12 col-md-12" v-if="false">
                <template v-if="detail.allow_everything">
                  Full Access
                </template>
                <q-tree
                  v-else
                  :nodes="permissions"
                  node-key="code"
                  label-key="title"
                  children-key="permission"
                  no-nodes-label="No Permissions Available"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RoleDetail',
  data() {
    return {
      dialog: 'RoleDetail',
      detail: {},
      loading: false,
    }
  },
  computed: {
    ...mapGetters('roles', ['permissions']),

    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    beforeShow() {
      if (this.properties.id) {
        this.loading = true
        this.$store
          .dispatch('roles/detailById', this.properties.id)
          .then((response) => {
            if (response.status && response.data) {
              let roleData = response.data
              roleData.permission = roleData.permission.map(
                (permission) => permission.permission_id
              )
              this.detail = roleData
            } else
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
