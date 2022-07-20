<template>
  <q-input
    :outlined="outlined"
    placeholder=""
    :label="label"
    ref="AutoCompleteInput"
    autocomplete="off"
    :value="value"
    :rules="rules"
    lazy-rules
    @input="onInput"
  />
</template>
<script>
export default {
  name: 'GoogleAutoComplete',
  props: {
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Array,
      default: () => {},
    },
    placechanged: {
      type: Function,
      default: null,
    },
    disableGoogleAutoComplete: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    onInput: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    if (
      !this.disableGoogleAutoComplete &&
      typeof google !== 'undefined' &&
      google.hasOwnProperty('maps')
    ) {
      let addressInput = this.$refs.AutoCompleteInput.$refs.input

      var autocomplete = new google.maps.places.Autocomplete(addressInput, {
        types: ['geocode'],
        placeholder: '',
        componentRestrictions: { country: 'us' },
      })

      google.maps.event.addDomListener(addressInput, 'keydown', (event) => {
        if (event.keyCode == 13) {
          if (event.preventDefault) {
            event.preventDefault()
          } else {
            // Since the google event handler framework does not handle early IE versions, we have to do it by our self. : -(
            event.cancelBubble = true
            event.returnValue = false
          }
        }
      })

      // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components.
      autocomplete.setFields(['address_component'])

      autocomplete.addListener('place_changed', () => {
        var place = autocomplete.getPlace().address_components
        if (!place) return

        if (this.placechanged && typeof this.placechanged === 'function') {
          this.placechanged(place)
        }
      })
    }
  },
}
</script>
