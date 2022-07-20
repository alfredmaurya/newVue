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
      <div class="form q-pa-md" v-if="detail">
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
                v-model.trim="detail.role_name"
                label="Role Name*"
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
            <h3 class="text-subtitle2 text-dark q-my-none">Permissions</h3>
          </div>

          <div class="col-12 col-md-6 text-right">
            <q-toggle
              v-model="detail.allow_everything"
              label="Allow All"
              left-label
              checked-icon="check"
              unchecked-icon="clear"
              :true-value="1"
              :false-value="0"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              ref="filter"
              filled
              v-model="filter"
              label="Search"
              :disable="!!detail.allow_everything"
            >
              <template v-slot:append>
                <q-icon
                  v-if="filter !== ''"
                  name="clear"
                  class="cursor-pointer"
                  @click="resetFilter"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-tree
              :nodes="permissions"
              :filter="filter"
              :filter-method="myFilterMethod"
              node-key="code"
              label-key="title"
              children-key="permission"
              tick-strategy="leaf"
              :ticked.sync="detail.permission"
              :expanded.sync="expanded"
              no-nodes-label="No Permissions Available"
              accordion
              :disabled="!!detail.allow_everything"
            />
          </div>
        </div>
      </div>
    </template>
  </visi-dialog>
</template>
<script>
function initialState() {
  return {
    dialog: 'RoleForm',
    title: 'Add Role',
    detail: {
      role_name: '',
      status: 1,
      permission: [],
      allow_everything: 0,
    },
    expanded: [],
    loading: false,
    submitting: false,
    filter: '',
  }
}
import { mapGetters } from 'vuex'
export default {
  name: 'RoleForm',
  data: initialState,
  computed: {
    ...mapGetters('roles', ['permissions']),
    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    resetFilter() {
      this.filter = ''
      this.$refs.filter.focus()
    },
    myFilterMethod(node, filter) {
      const filt = filter.toLowerCase()
      return node.title && node.title.toLowerCase().indexOf(filt) > -1
    },
    beforeShow() {
      if (this.properties.id) {
        this.title = 'Edit Role'
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
        // this.detail = JSON.parse(JSON.stringify(this.properties))
      }
    },
    onHide() {
      Object.assign(this.$data, initialState())
    },
    onSubmit() {
      this.submitting = true

      this.$store
        .dispatch('roles/addUpdate', this.detail)
        .then((response) => {
          if (response.status) {
            this.updateDialogState({
              dialog: 'RoleForm',
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
