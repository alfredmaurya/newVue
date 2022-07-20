<template>
  <q-item-section avatar>
    <q-avatar
      :color="color"
      text-color="white"
      :size="size"
      :font-size="fontSize"
      :square="square"
    >
      <q-img :ratio="1" v-if="avatarImage" :src="avatarImage">
        <template v-slot:loading>
          <q-spinner color="white" size="1.5em" :thickness="4" />
        </template>
      </q-img>
      <template v-else> {{ avatarCharacters }} </template>
    </q-avatar>
  </q-item-section>
</template>

<script>
export default {
  name: 'Avtar',
  props: {
    square: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '72px',
    },
    color: {
      type: String,
      default: 'primary',
    },
    fontSize: {
      type: String,
      default: '0.5em',
    },
    userName: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    avatarCharacters() {
      let avatarCharacters = ''

      if (this.imageUrl) return avatarCharacters

      if (this.userName) {
        let arrName = this.userName.split(' ').slice(0, 2)

        for (let word of arrName) {
          if (word.trim()) {
            avatarCharacters += word[0]
          }
        }
      }

      return avatarCharacters.toUpperCase()
    },
    avatarImage() {
      if (this.imageUrl) return this.imageUrl
      return ''
    },
  },
}
</script>
