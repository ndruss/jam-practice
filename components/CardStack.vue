<template>
  <div class="deck">
    <div class="card-stack">
      <CardWrapper
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
export default {
  computed: {
    activeCards() {
      return []
    },
    hasReachedEnd() {
      return false
    }
  },
  methods: {
    reShuffle() {
      console.log('reshuffling cards')
    }
  }
}
</script>

<style scoped>
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
  max-width: var(--card-width);
  height: var(--card-height);
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
