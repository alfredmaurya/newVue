<template>
  <q-dialog
    v-if="dialog"
    v-model="dialogState"
    maximized
    position="right"
    @before-show="beforeShow"
    @hide="localOnHide"
  >
    <q-card :class="`noRadius ${cardClass}`">
      <InnerLoadingSpinner :showing="loading" />
      <!-- Dialog Title -->
      <q-card-section v-show="!loading" class="dialogTitle">
        <h3 v-text="title" />
        <q-btn
          flat
          icon="close"
          class="absolute-right no-hover"
          v-close-popup
        />
      </q-card-section>
      <!-- Dialog Title -->

      <!-- Simple No scroll No form Content -->
      <q-card-section
        class="dialogContent q-pa-none"
        v-if="hasSimpleContent"
        v-show="!loading"
      >
        <slot name="SimpleContent" />
      </q-card-section>
      <!-- Simple No scroll No form Content -->

      <!-- Form,Sroll, footer Content -->
      <q-form v-show="!loading" @submit="onSubmit" v-if="hasScrollContent">
        <!-- v-on="{ submit: onSubmit ? onSubmit : {} }" -->
        <q-scroll-area
          :thumb-style="{ ...scrollAreaThumbStyle, zIndex: 2000 }"
          :bar-style="{ ...scrollAreaBarStyle, zIndex: 2000 }"
          :visible="scrollAreaVisible"
          class="ContentScrollArea"
          :style="{
            height: scrollHeight,
          }"
        >
          <q-card-section class="dialogContent">
            <slot name="ScrollContent" />
          </q-card-section>
        </q-scroll-area>

        <q-card-section class="dialogBottom" v-if="showFooter">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-12 text-right">
              <slot name="FooterButtons" v-if="hasFooterButtons" />
              <template v-else>
                <q-btn
                  unelevated
                  no-caps
                  color="blue-grey-1"
                  text-color="blue-grey-8"
                  label="Cancel"
                  class="q-mr-sm q-mr-lg-md"
                  size="13px"
                  padding="8px 24px"
                  v-close-popup
                />
                <q-btn
                  v-if="isOnBack"
                  unelevated
                  no-caps
                  color="blue-grey-1"
                  text-color="blue-grey-8"
                  label="Back"
                  class="q-mr-sm q-mr-lg-md"
                  size="13px"
                  padding="8px 24px"
                  v-on:click="onBack"
                />
                <q-btn
                  unelevated
                  no-caps
                  color="primary"
                  :label="submitLabel"
                  size="13px"
                  padding="8px 24px"
                  type="submit"
                  :loading="submitting"
                />
              </template>
            </div>
          </div>
        </q-card-section>
      </q-form>
      <!-- Form,Sroll, footer Content -->

      <slot name="AdditionalContent" />
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { isFunction } from 'src/utils'
export default {
  name: 'VisiDialog',
  props: {
    dialog: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    cardClass: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    onHide: {
      type: Function,
      default: null,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    beforeShow: {
      type: Function,
      default: () => {},
    },
    submitting: {
      type: Boolean,
      default: false,
    },
    removeParamOnHide: {
      type: Boolean,
      default: false,
    },
    submitLabel: {
      type: String,
      default: 'Save and Close',
    },
    onBack:{
      type: Function,
      default: () => {},
    },
    isOnBack:{
      type: Boolean,
      default: false,
    }
  },
  computed: {
    hasSimpleContent() {
      return !!this.$scopedSlots.hasOwnProperty('SimpleContent')
    },
    hasFooterButtons() {
      return !!this.$scopedSlots.hasOwnProperty('FooterButtons')
    },
    hasScrollContent() {
      return !!this.$scopedSlots.hasOwnProperty('ScrollContent')
    },
    scrollHeight() {
      let removeHeight = 76

      if (this.showFooter) removeHeight += 70

      return `calc(100vh - ${removeHeight}px)`
    },
    ...mapGetters('showcase', ['parentDialogs']),
    dialogState: {
      get() {
        return this.getDialogState(this.dialog)
      },
      set(val) {
        this.updateDialogState({
          dialog: this.dialog,
          val,
        })
      },
    },
  },
  methods: {
    localOnHide() {
      if (this.removeParamOnHide && this.$route.params && this.$route.params.id)
        this.$router.push({ name: this.$router.currentRoute.name })

      if (this.onHide && isFunction(this.onHide)) this.onHide()

      this.deleteDialogProperties(this.dialog)
    },
  },
}
</script>
