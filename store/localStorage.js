export const state = () => ({
    filters: {
      cardTypes: [],
      expire: 1 // hours
    },
})

export const mutations = {
  addCardTypeFilter(state, type) {
    state.filters.cardTypes.push(type)
  },
  removeCardTypeFilter(state, type) {
    const { cardTypes } = state.filters
    state.filters.cardTypes = cardTypes.filter((id) => type !== id)
  },
}
