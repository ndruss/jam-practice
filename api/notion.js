export const queryDatabaseEntries = async (id, requestOptions) => {
  const url = `https://api.notion.com/v1/databases/${id}/query`
  const options = {
    method: 'POST',
    headers: {
      ...requestOptions.headers,
      'Content-Type': 'application/json'
    }
  }
  return await fetch(url, options).then(res => res.json())
}

export const getDatabaseInfo = async (id, requestOptions) => {
  const url = `https://api.notion.com/v1/databases/${id}`
  return await fetch(url, requestOptions).then(res => res.json())
}

export const getNotionDatabase = async ({ secretKey, databaseId }) => {
  console.log('getting notion data')
  const requestOptions = {
    headers: {
      'Notion-Version': '2021-05-13',
      'Authorization': `Bearer ${secretKey}`
    }
  }
  const schema = await getDatabaseInfo(databaseId, requestOptions)
  const query = await queryDatabaseEntries(databaseId, requestOptions)
  return { schema, query }
}
