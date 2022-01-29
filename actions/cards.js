import { shuffle } from 'fast-shuffle'

const getRichTextField = ({ rich_text }) => {
  return rich_text.length ? (rich_text[0].plain_text || null) : null
}

const removeEmpty = obj => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ''))
}

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
      spotify_id,
      spotify_link: {
        formula: { string: spotifyLink }
      }
    } = properties

    return removeEmpty({
      id,
      title,
      type,
      spotifyLink,
      description: getRichTextField(description),
      artist: getRichTextField(artist),
      spotifyId: getRichTextField(spotify_id)
    })
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
