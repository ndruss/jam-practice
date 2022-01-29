import { shuffle } from 'fast-shuffle'

const mapEntriesToCards = entries => {
  return entries.map((entry) => {
    const { id, properties } = entry
    const {
      title: {
        title: [{ plain_text: title }]
      },
      description,
      type: { select: type },
      artist,
      spotify_id: spotifyId,
      spotify_link: {
        formula: { string: spotifyLink }
      }
    } = properties

    return {
      id,
      title,
      description,
      type,
      artist,
      spotifyId,
      spotifyLink
    }
  })
}

const setCardsWithFilters = (cards, filters) => {
  let activeCards = cards
  if (filters.cardTypes.length) {
    activeCards = cards.filter(card => filters.cardTypes.includes(card.type.id))
  }
  return shuffle(activeCards)
}

export { mapEntriesToCards, setCardsWithFilters }
