import { Client } from '@notionhq/client'

export const getNotionDatabase = async (secretKey, databaseId) => {
  console.log('getting notion data')

  // Initializing a client
  const notion = new Client({
    auth: secretKey
  })

  return await notion.databases.query({
    database_id: databaseId
  })
}
