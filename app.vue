<script setup>
  import { useRuntimeConfig } from '#app';
  import { Client } from '@notionhq/client'
  import { getAccessToken, getTrackData } from './api/spotify'
  // import { setCardsWithFilters, mapEntriesToCards } from './actions/cards'

  const config = useRuntimeConfig()

  const getNotionDatabase = async (secretKey, databaseId) => {
    console.log('getting notion data')

    // Initializing a client
    const notion = new Client({
      auth: secretKey
    })

    return await notion.databases.query({
      database_id: databaseId
    })
  }

  console.log(config.notion)

  const notionData = await getNotionDatabase(config.notion.secretKey, config.notion.databaseId)
  const cards = notionData.results
  console.log(cards)
  // const cardTypes = schema.properties.type.select.options
</script>

<template>
  <div class="app">
    <div class="grid-item-1">
      <CardStack :cards="cards" />
    </div>
    <div class="grid-item-2">
      <!-- <TheMenu class="container">
        <CardFilters :options="cardTypes" />
      </TheMenu> -->
    </div>
  </div>
</template>
