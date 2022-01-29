<template>
  <div class="track-image">
    <img :src="loaded && imageUrl" :class="{ active }" />
  </div>
</template>

<script>
export default {
  props: {
    uid: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    loaded: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    imageUrl() {
      const { albumArt } = this.$store.state
      return albumArt[this.uid][1].url
    }
  }
}
</script>

<style scoped>
  .track-image {
    display: inline-block;
    margin-bottom: 1rem;
    width: 120px;
    height: 120px;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
