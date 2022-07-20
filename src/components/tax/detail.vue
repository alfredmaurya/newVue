<template>
  <visi-dialog
    :dialog="dialog"
    title="View Tax"
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
                  <span>Tax Name </span>
                  {{ detail.tax_name || noDataPlaceHolder }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Tax Percentage</span>
                  {{ detail.tax_per }}%
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Updated At</span>
                  {{ detail.updated_at | formatDate('H:mm A, MMM DD, YYYY') }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-text">
                  <span>Updated By</span>
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
  name: 'TaxDetail',
  data() {
    return {
      dialog: 'TaxDetail',
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
          .dispatch('tax/detailById', this.properties.id)
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
