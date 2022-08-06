import qs from 'qs'

export const getAccessToken = async ({ clientId, clientSecret }) => {
  console.log('Getting spotify access code')
  const bearerToken = Buffer.from(clientId + ':' + clientSecret).toString('base64')
  const body = qs.stringify({ 'grant_type': 'client_credentials' })

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${bearerToken}`
    },
    body
  }).then(res => res.json())

  return response.access_token
}

export const getTrackData = async (uid, token) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  return response
}
