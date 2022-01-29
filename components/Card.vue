<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    class="card"
    :class="{ isAnimating, isCurrent }"
    :style="{ transform, zIndex }"
  >
    <CardContent :active="isCurrent" :content="content" :position="position" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import interact from 'interact.js'

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
    zIndex: {
      type: Number,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      content: {
        ...this.card,
      },
      isShowing: true,
      isAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
    }
  },

  computed: {
    transform() {
      if (!this.isAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`
      }
      return null
    },

    cardClass() {
      return [
        `card`,
        this.isCurrent && 'isCurrent',
        this.isAnimating && 'isAnimating',
      ]
    },
  },

  mounted() {
    const element = this.$refs.interactElement

    interact(element).draggable({
      onstart: () => {
        this.isAnimating = false
      },

      onmove: (event) => {
        const { interactMaxRotation, interactXThreshold } = this.$options.static
        const x = this.interactPosition.x + event.dx
        const y = this.interactPosition.y + event.dy

        let rotation = interactMaxRotation * (x / interactXThreshold)

        if (rotation > interactMaxRotation) {
          rotation = interactMaxRotation
        } else if (rotation < -interactMaxRotation) {
          rotation = -interactMaxRotation
        }

        this.interactSetPosition({ x, y, rotation })
      },

      onend: () => {
        this.isAnimating = true
        const { x, y } = this.interactPosition
        const { interactXThreshold, interactYThreshold } = this.$options.static

        if (x > interactXThreshold) {
          this.playCard('swipeRight')
        } else if (x < -interactXThreshold) {
          this.playCard('swipeLeft')
        } else if (y > interactYThreshold) {
          this.playCard('swipeDown')
        } else {
          // Reset card position
          this.interactSetPosition({})
        }
      },
    })
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset()
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false
        this.removeCard()
      }, 300)
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation,
      } = this.$options.static

      switch (interaction) {
        case 'swipeRight':
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation,
          })
          break
        
        case 'swipeLeft':
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation,
          })
          break
        
        case 'swipeDown':
          this.interactSetPosition({ y: interactOutOfSightYCoordinate })
          break
      }

      this.interactUnsetElement()
      this.hideCard()
    },

    interactSetPosition({ x = 0, y = 0, rotation = 0 }) {
      this.interactPosition = { x, y, rotation }
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset()
      this.isInteractDragged = true
    },

    removeCard() {
      this.$store.commit('removeCard')
    },

    ...mapMutations({}),
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/_settings';

$cardsTotal: 3;
$cardsPositionOffset: 7px;
$cardsScaleOffset: 0.01;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);

.card {
  background: rgb(218, 218, 218);
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  height: 100%;
  padding: 12px;
  pointer-events: none;
  position: absolute;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  user-select: none;
  width: 100%;
  will-change: transform, opacity;
  &.isCurrent {
    pointer-events: auto;
  }
  &.isAnimating {
    transition: transform 0.7s $ease-out-back, opacity 0.3s ease;
  }
  &:nth-child(n + #{$cardsTotal + 1}) {
    opacity: 0;
  }
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    transform: translateY($translation) scale($scale);
  }
}
</style>
