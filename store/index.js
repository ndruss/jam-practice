import { getNotionDatabase } from '../api/notion'
import { getAccessToken, getTrackData } from '../api/spotify'
import { setCardsWithFilters, mapEntriesToCards } from '../actions/cards'

export const state = () => ({
  activeCards: undefined,
  albumArt: {},
  cardIndex: 0,
  cards: [],
  cardTypes: [],
  gameStatus: 'not started'
})

export const mutations = {
  setCards(state, entries) {
    const cards = mapEntriesToCards(entries)
    state.cards = cards
  },
  setCardTypes(state, cardTypes) {
    state.cardTypes = cardTypes
  },
  setActiveCards(state, { cards = state.cards, filters }) {
    state.activeCards = setCardsWithFilters(cards, filters)
  },
  addCard(state, card) {
    state.activeCards.push(card)
  },
  removeCard(state) {
    state.activeCards.shift()
  },
  setSongs(state, songs) {
    state.songs = songs
  },
  addAlbumArt(state, { uid, images }) {
    state.albumArt[uid] = images
  },
  setGameStatus(state, status) {
    state.gameStatus = status
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    console.log('nuxtServerInit')
    const { $axios, $config } = this

    const { query, schema } = await getNotionDatabase($config.notion)
    const cardTypes = schema.properties.type.select.options
    commit('setCards', query.results)
    commit('setCardTypes', cardTypes)

    const spotifyToken = await getAccessToken($axios, $config.spotify)
    for (const entry of query.results) {
      const spotifyId = entry.properties.spotify_id.rich_text
      if (!spotifyId.length) return
      
      const uid = spotifyId[0].plain_text
      const trackData = await getTrackData(this.$axios, uid, spotifyToken)
      const { album: { images } } = trackData
      commit('addAlbumArt', { uid, images })
    }
  }
}
