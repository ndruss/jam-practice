<template>
  <div class="app">
    <div class="grid-item-1">
      <CardStack />
    </div>
    <div class="grid-item-2">
      <TheMenu class="container">
        <CardFilters :options="cardTypes" />
      </TheMenu>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    cardTypes() {
      return this.$store.state.cardTypes
    }
  },
  mounted() {
    this.setActiveCards()
  },
  methods: {
    setActiveCards() {
      const { filters } = this.$store.state.localStorage
      this.$store.commit('setActiveCards', { filters })
    },
    ...mapMutations({})
  }
}
</script>
