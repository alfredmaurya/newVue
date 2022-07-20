<template>
  <q-expansion-item
    v-model="expansion"
    v-if="
      menu.children && menu.children.length && hasPermission(menu.permission)
    "
    :group="`SideBarExpansionGroup-${depth}`"
    :class="`tree-menu-expandable ${activeClass}`"
  >
    <template v-slot:header>
      <q-item-section class="toggleIcon" avatar>
        <q-icon :name="menu.icon" />
      </q-item-section>
      <q-item-section class="toggleTitle" v-text="menu.title" />
    </template>
    <q-list class="q-pl-lg">
      <tree-menu
        :key="index"
        v-for="(node, index) in menu.children"
        :menu="node"
        :depth="depth + 1"
      />
    </q-list>
  </q-expansion-item>
  <Navigation :link="menu" v-else />
</template>
<script>
import Navigation from './navigation'
export default {
  name: 'tree-menu',
  props: {
    depth: Number,
    menu: Object,
  },
  components: { Navigation },
  watch: {
    $route() {
      setTimeout(() => {
        if (this.itemHasChild) {
          this.isChildActive(this.menu.children)
          this.closeIfNoChildActive(this.menu.children)
        }
      }, 1)
    },
  },
  computed: {
    itemHasChild() {
      return !!(this.menu.children && this.menu.children.length > 0)
    },
  },
  data() {
    return {
      expansion: false,
      activeClass: '',
    }
  },
  created() {
    if (this.itemHasChild) this.isChildActive(this.menu.children)
  },
  methods: {
    closeIfNoChildActive(children) {
      this.expansion = this.isChildActive(children)
    },
    isLinkActive(item) {
      return this.matchRoute(item) || this.isChildActive(item.children)
    },
    isChildActive(children) {
      if (!children) return false
      return children.some((item) => {
        return this.isLinkActive(item)
      })
    },
    matchRoute({ link }) {
      if (!link) return false
      const { route } = this.$router.resolve(link)
      if (route && route.name === this.$route.name) {
        this.expansion = true
        this.activeClass = 'child-is-active'
        return true
      }

      this.activeClass = ''
      return false
    },
  },
}
</script>
<style lang="scss">
.tree-menu-expandable {
  &.q-expansion-item--expanded,
  &.child-is-active {
    > .q-expansion-item__container {
      > .q-link {
        color: #fff;
      }
    }
  }
}
.q-expansion-item {
  a {
    padding-left: 50px;
  }
}
.body--dark {
  .tree-menu-expandable {
    &.q-expansion-item--expanded,
    &.child-is-active {
      > .q-expansion-item__container {
        > .q-link {
          color: #fff;
        }
      }
    }
  }
}
</style>
