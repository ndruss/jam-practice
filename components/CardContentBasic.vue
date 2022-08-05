<template>
  <div class="card-content wrap" :class="`bg-${type.color}`">
    <p class="type">{{ type.name }}</p>
    <div class="details">
      <p class="title">{{ title }}</p>
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
    }
  },
  data() {
    const { id, title, description, type } = this.content
    return { 
      id,
      title,
      description,
      type
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
