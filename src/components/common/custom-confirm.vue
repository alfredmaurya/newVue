<template>
  <q-dialog
    ref="dialog"
    :position="isMobile ? 'bottom' : 'standard'"
    @hide="onDialogHide"
  >
    <q-card class="removeCartItem">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="inner text-center">
        <h5 v-html="text" class="q-mt-none break-word" />
        <p v-html="description" />
        <p>
          <q-btn
            unelevated
            rounded
            outline
            color="tertiary"
            label="No"
            class="q-ma-sm q-py-sm q-px-md radius-lg"
            @click="onCancelClick"
          />
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Yes"
            class="q-ma-sm q-py-sm q-px-md radius-lg"
            @click="onOKClick"
          />
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'EmptyCartConfirm',
  props: {
    text: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    },
  },
}
</script>
