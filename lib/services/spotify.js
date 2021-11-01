const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: '-',
  clientSecret: '-'
})

spotifyApi
  .clientCredentialsGrant()
  .then((result) => {
    console.log('It worked! Your access token is: ' + result.body.access_token)
    spotifyApi.setAccessToken(result.body.access_token)
  })
  .catch((err) => {
    console.log('invalid clientId and clientSecret', err)
  })

async function search(song = 'hammarby') {
  const {
    body: {
      tracks: { items }
    }
  } = await spotifyApi.search(song, ['track'])

  return items.map((x) => ({
    name: x.name,
    uri: x.uri,
    artists: x.artists[0]
  }))
}

async function getRelatedArtists(artist = '0qeei9KQnptjwb8MgkqEoy') {
  const {
    body: { artists }
  } = await spotifyApi.getArtistRelatedArtists(artist)

  return artists
    .map((x) => ({
      name: x.name,
      image: x.images
        .map((x) => {
          if (x.height == 160) return x.url
        })
        .filter((x) => x)[0]
    }))
    .slice(0, 4)
}

module.exports = {
  search,
  getRelatedArtists
}
