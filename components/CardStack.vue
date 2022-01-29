<template>
  <div class="deck">
    <div class="card-stack">
      <Card
        v-for="(card, index) in activeCards"
        :key="card.id"
        :card="card"
        :is-current="index === 0"
        :position="index + 1"
        :z-index="activeCards.length - index"
      />
      <div v-if="hasReachedEnd" class="no-cards-area">
        <div>
          <h3>No more cards</h3>
          <button class="reshuffle-button" @click="reShuffle">Reshuffle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    activeCards() {
      return this.$store.state.activeCards || []
    },
    hasReachedEnd() {
      return this.$store.state.gameStatus !== 'not started' && this.activeCards.length < 1
    }
  },
  methods: {
    reShuffle() {
      const { filters } = this.$store.state.localStorage
      this.$store.commit('setActiveCards', { filters })
    },
    ...mapMutations({})
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_settings';
.deck {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-stack {
  position: relative;
  display: flex;
  width: 90%;
  max-width: $card_width;
  height: $card_height;
}

.no-cards-area {
  --foreground-color: rgba(255, 255, 255, 0.75);
  color: var(--foreground-color);
  border-radius: 6px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reshuffle-button {
  font-size: inherit;
}
</style>
