<template>
  <q-inner-loading :showing="showing">
    <q-spinner
      color="primary"
      :size="isMobile ? '1em' : '2.5em'"
      :thickness="isMobile ? 3 : 2.5"
    />
  </q-inner-loading>
</template>
<script>
export default {
  name: 'InnerLoadingSpinner',
  props: {
    showing: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.q-inner-loading {
  z-index: 2100;
}
</style>
