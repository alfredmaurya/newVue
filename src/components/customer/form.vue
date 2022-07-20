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

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.first_name"
                label="First Name*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.last_name"
                label="Last Name*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.email"
                label="Email*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.phone_no"
                label="Phone*"
                mask="(###)-###-####"
                lazy-rules
                :rules="[$rules.required(), $rules.validatePhone()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.address_line1"
                label="Address Line1*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.address_line2"
                label="Address Line2"
                lazy-rules
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.city"
                label="Cty*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.state"
                label="State*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.country"
                label="Country*"
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.postcode"
                label="Postcode*"
                lazy-rules
                :rules="[$rules.required()]"
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
function initialState() {
  return {
    roleOptions: [],
    dialog: 'CustomerForm',
    title: 'Add Customer',
    type: 'add',
    detail: {
      first_name: '',
      last_name: '',
      email: '',
      phone_no: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      country: '',
      postcode: '',
      status: 1,
    },
    loading: false,
    submitting: false,
  }
}

import { mapGetters } from 'vuex'
export default {
  name: 'CustomerForm',
  data: initialState,
  computed: {
    properties() {
      return this.getDialogProperties(this.dialog)
    },
    ...mapGetters('common', ['roles']),
  },
  methods: {
    filterRole(val, update) {
      if (val === '') {
        update(() => {
          this.roleOptions = this.roles
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.roleOptions = this.roles.filter(
          (role) => role.role_name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    beforeShow() {
      if (this.properties.id) {
        this.type = 'edit'
        this.title = 'Edit Customer'
        this.detail = JSON.parse(JSON.stringify(this.properties))

        // for (const key in this.detail) {
        //   if (this.properties[key]) this.detail[key] = this.properties[key]
        // }
      }
    },
    onHide() {
      Object.assign(this.$data, initialState())
    },
    onSubmit() {
      this.submitting = true

      this.$store
        .dispatch('customer/addUpdate', this.detail)
        .then((response) => {
          if (response.status) {
            this.updateDialogState({
              dialog: 'CustomerForm',
              val: false,
            })
            this.showSuccess(response.message)
            this.$root.$emit('customer-added-modified', response.data)
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
