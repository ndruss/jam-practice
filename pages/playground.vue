<template>
  <div>
    <h1>Playground</h1>
    <div v-show="loaded">
      <p>$localStorageLoaded: {{ $localStorageLoaded }}</p>
      <p>Animal: {{ $store.state.localStorage.animal.value }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
    }
  },
  async fetch() {
  },
  computed: {
    loaded() {
      return this.$store.state.localStorage.status
    }
  },
  mounted() {
    console.log('Mounted')
    if (!this.$store.state.localStorage.animal.value) {
      console.log('Setting localStorage')
      this.setAnimal('Dog')
    } else {
      console.log('Using localStorage')
      console.log()
    }
  },
  methods: {
    setAnimal(animal) {
      this.$store.commit('localStorage/setAnimal', animal)
    },
    ...mapMutations({})
  }
}
</script>

<style></style>
