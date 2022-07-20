<template>
  <q-item
    v-if="hasPermission(link.permission)"
    tag="a"
    :to="link.link"
    class="no-underline"
    :exact="link.exact || false"
  >
    <q-item-section avatar v-if="link.icon">
      <q-icon :name="link.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label v-text="link.title"> </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  name: 'Navigation',
  props: {
    link: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>
