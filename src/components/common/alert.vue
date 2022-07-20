<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-show="localShow"
      :class="`alert alert-${variant} ${className}`"
      :id="id"
    >
      <a
        href="javascript:void(0)"
        @click="dismiss"
        v-if="dismissible"
        class="close float-right"
      >
        <BaseIcon size=".65rem" icon="close" />
      </a>
      <BaseIcon v-if="variant == 'success'" icon="checkmark" class="q-mr-sm" />
      <q-icon
        v-else-if="variant == 'danger'"
        size="1rem"
        name="error_outline"
        class="q-mr-sm"
      />
      <!-- <BaseIcon v-else-if="variant == 'danger'" icon="close" class="q-mr-sm" /> -->
      <slot />
    </div>
  </transition>
</template>
<script>
import { toInteger, requestAF, isBoolean, isNumeric } from 'src/utils'

const parseCountDown = (show) => {
  if (show === '' || isBoolean(show)) {
    return 0
  }
  show = toInteger(show, 0)
  return show > 0 ? show : 0
}

const parseShow = (show) => {
  if (show === '' || show === true) {
    return true
  }
  if (toInteger(show, 0) < 1) {
    // Boolean will always return false for the above comparison
    return false
  }
  return !!show
}

export default {
  name: 'Alert',
  model: {
    prop: 'show',
    event: 'input',
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'success',
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
    show: {
      type: [Boolean, Number, String],
      default: false,
    },
  },
  data() {
    return {
      countDown: 0,
      countDownTimeout: null,

      // If initially shown, we need to set these for SSR
      localShow: parseShow(this.show),
    }
  },

  watch: {
    show(newVal) {
      this.countDown = parseCountDown(newVal)
      this.localShow = parseShow(newVal)
    },
    countDown(newVal) {
      this.clearCountDownInterval()
      if (isNumeric(this.show)) {
        // Ignore if this.show transitions to a boolean value.
        this.$emit('dismiss-count-down', newVal)
        if (this.show !== newVal) {
          // Update the v-model if needed
          this.$emit('input', newVal)
        }
        if (newVal > 0) {
          this.localShow = true
          this.countDownTimeout = setTimeout(() => {
            this.countDown--
          }, 1000)
        } else {
          // Slightly delay the hide to allow any UI updates
          this.$nextTick(() => {
            requestAF(() => {
              this.localShow = false
            })
          })
        }
      }
    },
    localShow(newVal) {
      if (!newVal && (this.dismissible || isNumeric(this.show))) {
        // Only emit dismissed events for dismissible or auto dismissing alerts
        this.$emit('dismissed')
      }
      if (!isNumeric(this.show) && this.show !== newVal) {
        // Only emit booleans if we weren't passed a number via `this.show`
        this.$emit('input', newVal)
      }
    },
  },

  created() {
    this.countDown = parseCountDown(this.show)
    this.localShow = parseShow(this.show)
  },
  mounted() {
    this.countDown = parseCountDown(this.show)
    this.localShow = parseShow(this.show)
  },
  beforeDestroy() {
    this.clearCountDownInterval()
  },
  methods: {
    dismiss() {
      this.clearCountDownInterval()
      this.countDown = 0
      this.localShow = false
    },
    clearCountDownInterval() {
      if (this.countDownTimeout) {
        clearTimeout(this.countDownTimeout)
        this.countDownTimeout = null
      }
    },
  },
}
</script>
<style lang="scss">
.alert {
  position: relative;
  font-size: 12px;
  padding: 10px 15px;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 5px;
  &.q-mb-none {
    margin-bottom: 0;
  }
  @media (min-width: 1024px) {
    font-size: 14px;
  }
  .close {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    text-decoration: none;
    padding: 10px;
    color: #000;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  &.alert-primary {
    color: #2a9dcc;
    background-color: #fff;
    border-color: #a4d1e5;
  }
  &.alert-secondary {
    color: #e54d08;
    background-color: #fff0e9;
    border-color: #ec7a7a;
  }
  &.alert-success {
    color: #008a03;
    background-color: #fafff6;
    border-color: #a3cc80;
  }
  &.alert-danger {
    color: #ec7a7a;
    background-color: #fdf1f1;
    border-color: #ec7a7a;
  }
  &.alert-warning {
    color: #e3a62c;
    background-color: #fff9ee;
    border-color: #e3a62c;
  }
  &.alert-info {
    color: #2a9dcc;
    background-color: #ffffff;
    border-color: #a4d1e5;
  }
  &.alert-light {
    color: #818182;
    background-color: #fefefe;
    border-color: #fdfdfe;
  }
  &.alert-dark {
    color: #1b1e21;
    background-color: #d6d8d9;
    border-color: #c6c8ca;
  }
}
</style>
