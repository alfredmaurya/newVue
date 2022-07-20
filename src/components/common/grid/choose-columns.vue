<template>
  <visi-dialog
    :dialog="dialog"
    title="Choose Columns"
    cardClass="q-card-sm"
    show-footer
    :onSubmit="submit"
  >
    <template v-slot:ScrollContent>
      <div class="q-pa-lg">
        <q-option-group
          v-model="selectedColumns"
          :options="columsOption"
          type="checkbox"
        />
      </div>
    </template>

    <template v-slot:FooterButtons>
      <q-btn
        unelevated
        no-caps
        color="blue-grey-1"
        text-color="blue-grey-8"
        label="Reset"
        class="q-mr-md"
        size="13px"
        padding="8px 24px"
        @click="resetToDefault"
        :disable="disableResetButton"
      />
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="Save"
        size="13px"
        padding="8px 24px"
        type="submit"
        :disable="disableSubmitButton"
      />
    </template>
  </visi-dialog>
</template>
<script>
import { arrayIsEqual } from 'src/utils'

export default {
  name: 'ChooseColumns',
  props: {
    setColumns: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      localSelectedColumns: null,
      dialog: 'ChooseColumns',
    }
  },
  computed: {
    selectedColumns: {
      get() {
        if (this.localSelectedColumns) return this.localSelectedColumns
        else if (this.properties && this.properties.selectedColumns)
          return this.properties.selectedColumns

        return []
      },
      set(val) {
        this.localSelectedColumns = val
      },
    },
    columsOption() {
      let options = [],
        hasAnyFixed = false
      if (this.properties && this.properties.columms) {
        options = this.properties.columms.map((columm) => {
          if (columm.isFixed && !hasAnyFixed) hasAnyFixed = true
          return {
            label: columm.label,
            disable: columm.isFixed,
            value: columm.name,
          }
        })
        if (!hasAnyFixed) {
          options.every((column, index) => {
            if (index >= 2) return false
            column.disable = true
            return true
          })
        }
      }
      return options
    },
    properties() {
      return this.getDialogProperties(this.dialog)
    },
    disableResetButton() {
      return arrayIsEqual(
        this.properties.defaultVisibleColumns || [],
        this.selectedColumns
      )
    },
    disableSubmitButton() {
      return arrayIsEqual(
        this.properties.selectedColumns || [],
        this.selectedColumns
      )
    },
  },
  methods: {
    submit() {
      if (this.setColumns) this.setColumns(this.selectedColumns)
      this.updateDialogState({
        dialog: this.dialog,
        val: false,
      })
    },
    resetToDefault() {
      if (this.properties && this.properties.defaultVisibleColumns)
        this.selectedColumns = this.properties.defaultVisibleColumns
    },
  },
}
</script>
