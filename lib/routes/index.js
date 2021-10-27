const { getRelatedArtists, search } = require('../services/spotify')
exports.add = (app) => {
  app.get('/relatedArtists/:artist', async (req, res, next) => {
    res.send(await getRelatedArtists(req.params.artist))
    return next()
  })
  app.get('/search/:search', async (req, res, next) => {
    res.send(await search(req.params.search))
    return next()
  })
}
