<template>
  <div class="card-content" :class="`bg-${type.color}`">
    <p class="type">{{ type.name }}</p>
    <div class="details">
      <TrackImage
        v-if="spotifyId"
        :uid="spotifyId"
        :active="active"
        :loaded="position < 3"
      />
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
  }
}
</script>

<style scoped>
.card-content {
  border-radius: 5px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: min(7%, 28px);
}

.details {
  text-align: center;
}

.title {
  font-size: 1.7rem;
  line-height: 1.25;
  margin: 0 0 0.25em 0;
  font-weight: 500;
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

.type {
  text-align: center;
  position: absolute;
  top: 30px;
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
  letter-spacing: 0.6px;
}
</style>
