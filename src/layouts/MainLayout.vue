<template>
  <q-layout view="lHh Lpr lFf">
    <Header ref="headerBox" />
    <Sidebar />

    <q-page-container>
      <router-view v-if="isMobile" />
      <q-scroll-area
        :thumb-style="{ ...scrollAreaThumbStyle, zIndex: 2000 }"
        :bar-style="{ ...scrollAreaBarStyle, zIndex: 2000 }"
        :visible="scrollAreaVisible"
        :style="{
          height: `calc(100vh - ${headerHight}px)`,
        }"
        v-else
      >
        <transition
          :enter-active-class="enterClass"
          :leave-active-class="leaveClass"
          appear
          :duration="400"
        >
          <router-view v-show="themeApplied" />
        </transition>
        <p
          class="type-writing"
          v-show="!themeApplied"
          style="position: absolute; left: 50px; top: 50px"
          v-text="`/${currentThemeName}.exe`"
        />
        <Footer v-show="themeApplied" />
      </q-scroll-area>
    </q-page-container>
    <UserProfile />
    <CustomerForm v-if="hasPermission(['customer_add', 'customer_edit'])" />
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from 'components/header'
import Sidebar from 'components/sidebar'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Sidebar,
    CustomerForm: () => import('components/customer/form'),
    UserProfile: () => import('components/header/user-profile'),
  },
  computed: {
    ...mapGetters('common', ['enterClass', 'leaveClass']),
  },
  data() {
    return {
      headerHight: 0,
    }
  },
  created() {
    this.applyThemeChanges()
  },
  mounted() {
    if (this.$refs.headerBox && this.$refs.headerBox.$el)
      this.headerHight = this.$refs.headerBox.$el.clientHeight

    window.onfocus = () => {
      this.$store.dispatch('auth/getCurrentEmployee').then(() => {
        let { meta } = this.$route
        if (
          meta &&
          'permission' in meta &&
          !this.hasPermission(meta.permission)
        )
          this.$router.push({ name: 'Homepage' })
      })
    }
  },
}
</script>
