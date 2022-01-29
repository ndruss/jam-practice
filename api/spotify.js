import qs from 'qs'

export const getAccessToken = async ($axios, { clientId, clientSecret }) => {
  console.log('Getting spotify access code')
  const bearerToken = Buffer.from(clientId + ':' + clientSecret).toString('base64')
  const body = qs.stringify({ 'grant_type': 'client_credentials' })

  const response = await $axios.$post('https://accounts.spotify.com/api/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${bearerToken}`
    }
  })

  return response.access_token
}

export const getTrackData = async ($axios, uid, token) => {
  const response = await $axios.$get(`https://api.spotify.com/v1/tracks/${uid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return response
}
