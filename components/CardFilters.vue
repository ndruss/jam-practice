<template>
  <div class="card-filters">
    <p class="legend">Filter by type</p>
    <div v-for="option in options" :key="option.id" :class="`filter-checkbox ${option.color}`">
      <input
        :id="option.id"
        type="checkbox"
        :value="option.id"
        :name="option.name"
        :checked="filters.cardTypes.includes(option.id)"
        @change="toggleFilter"
      />
      <label :for="option.id">{{ option.name }}</label>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    filters() {
      return {}
    },
  },
  methods: {
    toggleFilter(e) {
      const id = e.target.value
      if (!this.filters.cardTypes.includes(id)) {
        this.addCardTypeFilter(id)
      } else {
        this.removeCardTypeFilter(id)
      }
    },
    addCardTypeFilter(id) {
      
    },
    removeCardTypeFilter(id) {
      
    }
  }
}
</script>

<style scoped>
.card-filters {
  color: white;
  text-align: left;
  margin-top: 8vh;
}

.legend {
  margin-bottom: 2rem;
}

.filter-checkbox {
  user-select: none;
  position: relative;
  border-bottom: solid 1px #ffffff28;
}

.filter-checkbox input {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  display: block;
}

.filter-checkbox label {
  color: #ffffff9c;
  line-height: 1.4;
  display: block;
  font-weight: 400;
  cursor: pointer;
  padding: 10px 60px 10px 10px;
}

.filter-checkbox input:checked + label {
  color: white;
}
</style>
