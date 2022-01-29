<template>
  <div class="menu">
    <MenuButton :is-open="isOpen" :toggle="toggle" />
    <transition name="fade">
      <div v-if="isOpen" class="menu-modal">
        <div class="modal-content container">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      isOpen: false,
      isAnimating: false,
      currentFilters: [...this.$store.state.localStorage.filters.cardTypes]
    }
  },
  methods: {
    open() {
      this.currentFilters = [...this.$store.state.localStorage.filters.cardTypes]
      this.isOpen = true
    },
    close() {
      const storeFilters = this.$store.state.localStorage.filters
      const noFilterChange = storeFilters.cardTypes.every(filter => this.currentFilters.includes(filter)) && storeFilters.cardTypes.length === this.currentFilters.length
      if (!noFilterChange) {
        this.setActiveCards(storeFilters)
      }
      this.isOpen = false
    },
    toggle() {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    },
    setActiveCards(filters) {
      const cards = this.$store.state.cards
      this.$store.commit('setActiveCards', { cards, filters })
    },
    ...mapMutations({})
  }
}
</script>

<style lang="scss" scoped>
.menu {
  text-align: center;
}

.menu-modal {
  background: #181825;
  position: fixed;
  inset: 0;
  z-index: 100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
