<template>
  <q-drawer
    v-model="drawerState"
    show-if-above
    :mini="enabledMiniState && miniState"
    :mini-to-overlay="enabledMiniState"
    :content-class="!isMobile ? 'leftSidebar' : 'leftSidebar white'"
    :width="260"
  >
    <q-img class="sidebarTop" style="height: 62px" v-if="!isMobile">
      <div class="absolute-bottom bg-transparent sidebar-logo">
        <div class="text-weight-bold">
          <!-- <q-img
            src="~assets/quasar-logo-full.svg"
            class="login-logo"
            width="120px"
            height="28px"
          />
          Blue Book -->
          <img src="logoicon-white.png" height="36px" />
        </div>
      </div>
      <q-btn
        flat
        unelevated
        color="primary"
        text-color="white"
        @click="enabledMiniState = !enabledMiniState"
        :class="
          enabledMiniState && miniState
            ? 'absolute-right toggle no-radius flip-horizontal'
            : 'absolute-right toggle no-radius'
        "
      >
        <BaseIcon
          size="1.5rem"
          :icon="enabledMiniState && miniState ? 'deskToogle' : 'deskToogle'"
        />
      </q-btn>
    </q-img>

    <q-scroll-area style="height: calc(100% - 62px)">
      <q-list
        padding
        class="menu-list"
        @mouseover="enabledMiniState ? (miniState = false) : null"
        @mouseout="enabledMiniState ? (miniState = true) : null"
      >
        <tree-menu
          v-for="(sidebarLink, index) in sidebarLinks"
          :key="`${sidebarLink.title}-${index}`"
          :menu="sidebarLink"
          :depth="0"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { sidebarLinks } from 'src/constants'
export default {
  name: 'Sidebar',
  components: { TreeMenu: () => import('./tree-menu') },
  data() {
    return {
      miniState: true,
      scan: true,
      rescan: false,
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
    drawerState: {
      get() {
        return this.$store.state.showcase.sideBar
      },
      set(val) {
        this.$store.commit('showcase/updateSidebarState')
      },
    },
  },
}
</script>

<style lang="scss">
.leftSidebar {
  // background: #fff;
  // border-right: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba($sidebarhover, 0.05);
  // box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 15px rgba($sidebarhover, 0.05);
  .sidebarTop {
    background: #fff;
    .sidebar-logo {
      padding: 12px;
      padding-top: 0;
    }
  }
  .menu-list {
    padding: 24px 0;
    i {
      // color: #b5b5c3;
      color: $body-light;
    }
    .q-item {
      font-size: 14px;
      .q-item__section--avatar {
        // min-width: 46px;
      }
    }
    .q-item.q-router-link--active,
    .q-item--active {
      i {
        color: $primary;
      }
      .q-focus-helper {
        background: $primary;
        opacity: 0.05;
        &:before,
        &:after {
          background: $primary;
        }
      }
    }
  }
}

/*.body--dark {}*/
.leftSidebar {
  background: $sidebarprimary;
  .sidebarTop {
    background: $sidebarprimarydark;
    .toggle {
      background: $sidebarprimarydark;
    }
  }
  .menu-list {
    color: $sidebartext;
    i {
      color: $sidebaricon;
    }
    .q-item.q-router-link--active {
      color: #fff;
      i {
        color: #fff;
      }
    }
    .q-item {
      &:hover,
      &:focus,
      &.q-router-link--active {
        .q-focus-helper {
          background: $sidebarhover;
          &:before,
          &:after {
            background: $sidebarhover;
          }
        }
      }
    }
  }
}

.sidebar {
  .sidebarTop {
    .q-btn {
      // -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
      -webkit-box-shadow: 0 3px 6px rgba($sidebarhover, 0.15);
      // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
      box-shadow: 0 3px 6px rgba($sidebarhover, 0.15);
      -webkit-border-radius: 7px;
      border-radius: 7px;
    }
    .q-item__label {
      font-size: 20px;
      // color: rgba(0, 0, 0, 0.9);
      color: rgba($sidebarhover, 0.9);
      &.text-caption {
        font-size: 14px;
        // color: rgba(0, 0, 0, 0.6);
        color: rgba($sidebarhover, 0.6);
      }
    }
  }
  .q-item__label--header {
    font-size: 18px;
    color: #9aacb2;
    i {
      color: #bcccd2;
    }
  }
  .q-item {
    font-size: 18px;
    font-weight: 600;
    color: #2f2c37;
    &:hover {
      .q-focus-helper {
        background: $sidebarhover;
        &:before,
        &:after {
          background: $sidebarhover;
        }
      }
    }
  }
  .q-checkbox__label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    width: 60px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.15);
    text-transform: uppercase;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 15px;
  }
  .q-checkbox__inner {
    display: none;
  }
  .q-checkbox__inner--truthy ~ .q-checkbox__label {
    color: $positive;
    border-color: $positive;
  }
  .q-checkbox__inner--falsy ~ .q-checkbox__label {
    color: #d9534f;
    border-color: #d9534f;
  }
  .bg-dark & {
    .sidebarTop {
      .q-btn {
        background: #fff;
      }
      .q-item__label {
        color: rgba(255, 255, 255, 0.9);
        &.text-caption {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    .q-item {
      color: #fff;
    }
  }
  .sidebarBottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(217, 83, 79, 0.08);
    color: #d9534f;
    font-size: 14px;
    font-weight: normal;
    .q-item__section--avatar {
      min-width: 40px;
      i {
        color: #d9534f;
      }
    }
  }
}
</style>
