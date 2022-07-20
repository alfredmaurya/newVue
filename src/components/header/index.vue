<template>
  <q-header elevated class="bg-white text-dark" height-hint="98">
    <q-toolbar class="headerBar bg-white text-dark">
      <q-toolbar-title class="text-left mobile-logo-toggle">
        <!-- Visi Admin -->
        <div class="flex">
          <q-btn
            flat
            unelevated
            color="primary"
            @click="enabledMiniState = !enabledMiniState"
            v-if="isMobile"
            :class="
              enabledMiniState && miniState
                ? ' toggle no-radius flip-horizontal'
                : ' toggle no-radius'
            "
          >
            <span class="material-icons"> menu </span>
          </q-btn>
          <q-img
            class="sidebarTop tt"
            style="height: 50px; width: 100px"
            v-if="isMobile"
          >
            <div class="bg-transparent sidebar-logo">
              <div class="text-weight-bold">
                <q-img
                  src="~assets/quasar-logo-full.svg"
                  class="login-logo"
                  width="100px"
                  height="28px"
                />
              </div>
            </div>
          </q-img>
        </div>
        <q-drawer
          v-if="isMobile"
          v-model="enabledMiniState"
          show-if-above
          :mini="enabledMiniState && miniState"
          :mini-to-overlay="enabledMiniState"
          :content-class="isMobile ? 'leftSidebar' : 'leftSidebar white'"
        >
          <q-scroll-area style="height: calc(100% - 62px)">
            <q-list padding class="menu-list">
              <tree-menu
                v-for="(sidebarLink, index) in sidebarLinks"
                :key="`${sidebarLink.title}-${index}`"
                :menu="sidebarLink"
                :depth="0"
              />
            </q-list>
          </q-scroll-area>
        </q-drawer>
      </q-toolbar-title>

      <!-- <q-btn
        unelevated
        v-if="currentTheme && false"
        flat
        @click="toggleTheme"
        :icon="currentTheme.icon"
        v-show="!isMobile"
        :disable="!themeApplied"
      /> -->

      <q-btn
        unelevated
        flat
        @click="$q.fullscreen.toggle()"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        v-show="!isMobile"
      />

      <!-- <q-btn
        no-caps
        unelevated
        flat
        @click="
          updateDialogState({
            dialog: 'Settings',
            val: true,
          })
        "
      >
        <BaseIcon icon="settings" />
      </q-btn> -->

      <q-item
        clickable
        v-ripple
        class="btnUser"
        @click="
          updateDialogState({
            dialog: 'UserProfile',
            val: true,
          })
        "
      >
        <Avtar
          :userName="`${userData.first_name} ${userData.last_name}`"
          size="2em"
        />
        <q-item-section v-show="!isMobile">
          <q-item-label class="ellipsis">
            <strong v-text="`${userData.first_name} ${userData.last_name}`" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-toolbar>
    <!-- <q-separator color="grey-2" />
    <q-toolbar class="headerSub justify-center">
      <q-toolbar-title class="text-left">
        Visi Admin
      </q-toolbar-title>
    </q-toolbar> -->
    <!-- <q-separator color="grey-2" /> -->
  </q-header>
</template>
<script>
import { sidebarLinks } from 'src/constants'
export default {
  name: 'Header',
  components: {
    TreeMenu: () => import('../sidebar/tree-menu'),
  },
  data() {
    return {
      miniState: true,
      sidebarLinks: sidebarLinks,
    }
  },
  computed: {
    enabledMiniState: {
      get() {
        return this.$store.state.persisted.enabledMiniState
      },
      set(val) {
        if (val) this.miniState = true
        this.$store.commit('persisted/TOGGLE_MINISTATE')
      },
    },
    sideBar() {
      return this.$store.state.showcase.dialog.sideBar
    },
  },
}
</script>
<style scoped>
.headerBar {
  height: 61px;
}
.headerSub {
  min-height: 50px;
}
.mobile-logo-toggle {
  padding-left: 0;
}
</style>
