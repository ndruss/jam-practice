<template>
  <div class="card-content">
    <div class="hero">
      
      <img :src="imageUrl" :class="{ active }" />
    </div>
    <div class="details">
      <p class="title">{{ title }}</p>
      <p v-if="artist" class="artist">{{ artist }}</p>
      <div v-if="spotifyLink" class="link-area">
        <a :href="spotifyLink" class="spotify-link">Listen on Spotify</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  data() {
    const { id, title, description, type, artist, spotifyId, spotifyLink } = this.content
    return { 
      id,
      title,
      description,
      type,
      artist,
      spotifyId,
      spotifyLink,
    }
  },
  computed: {
    imageUrl() {
      const { albumArt } = this.$store.state
      return this.position < 3 ? albumArt[this.spotifyId][0].url : null
    }
  }
}
</script>

<style scoped>
.card-content {
  --border-radius: 5px;
  border-radius: var(--border-radius);
  color: #fff;
  height: 100%;
  background: black;
  position: relative;
}

.card-content::before {
  content: '';
  border-radius: inherit;
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(0 0 0 / 30%), rgb(0 0 0 / 75%) 90%);
}

.hero {
  height: 100%;
}

.hero img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

.title {
  font-size: 1.7rem;
  line-height: 1.25;
  margin: 0 0 0.25em 0;
  font-weight: 500;
}

.details {
  position: absolute;
  left: 0;
  bottom: 3.5vh;
  width: 100%;
  padding: min(7%, 28px);
  text-align: center;
}

.artist {
  margin: 0;
}

.link-area {
  margin-top: 1.5rem;
}

.spotify-link {
  border: solid 1px rgb(255 255 255 / 66%);
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  font-size: 0.8rem;
  padding: 0.25em 0.5em;
  text-decoration: none;
}

</style>
