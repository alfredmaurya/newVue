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
                label="Location Name*"
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
                type="textarea"
                label="Description"
                autogrow
                lazy-rules
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field__area q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.address"
                label="Address*"
                type="textarea"
                autogrow
                lazy-rules
                :rules="[$rules.required()]"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="form-field__area q-pb-none">
              <q-input
                outlined
                v-model.trim="detail.mobile"
                label="Phone*"
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
function initialState() {
  return {
    dialog: 'LocationForm',
    title: 'Add Location',
    detail: {
      title: '',
      description: '',
      address: '',
      mobile: '',
      status: 1,
    },
    loading: false,
    submitting: false,
  }
}
export default {
  name: 'LocationForm',
  data: initialState,
  computed: {
    properties() {
      return this.getDialogProperties(this.dialog)
    },
  },
  methods: {
    beforeShow() {
      if (this.properties.id) {
        this.title = 'Edit Location'
        this.detail = JSON.parse(JSON.stringify(this.properties))
      }
    },
    onHide() {
      Object.assign(this.$data, initialState())
    },
    onSubmit() {
      this.submitting = true

      this.$store
        .dispatch('location/addUpdate', this.detail)
        .then((response) => {
          if (response.status) {
            this.updateDialogState({
              dialog: 'LocationForm',
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
