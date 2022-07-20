<template>
  <q-item
    v-if="isMobile"
    class="sidebarBottom inline q-pl-none q-pt-none"
    clickable
    to="/login"
    @click="logOut"
  >
    <q-item-section>Logout</q-item-section>
  </q-item>
  <q-btn
    to="/login"
    v-else
    unelevated
    no-caps
    color="light-primary"
    text-color="primary"
    @click="logOut"
  >
    Log Out
  </q-btn>
</template>
<script>
export default {
  name: 'Logout',
  methods: {
    logOut() {
      this.$store.dispatch('auth/logOut')
      this.updateDialogState({
        dialog: 'UserProfile',
        val: false,
      })
      localStorage.clear();
    },
  },
}
</script>
