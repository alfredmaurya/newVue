<template>
  <q-icon :size="size" :class="className" :data-icon="icon" :color="color">
    <q-img :src="icon" v-if="fullPath" />
    <svg class="icon" v-else>
      <use v-bind="{ 'xlink:href': 'project-svgs.svg#' + icon }" />
    </svg>
  </q-icon>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      default: 'arrow-down',
    },
    size: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    fullPath: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
