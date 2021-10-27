const express = require('express')
const app = express()
const port = 3000
const routes = require('./lib/routes')

routes.add(app)

app.get('/', async (req, res) => {
  res.send('whatscookin')
})

app.listen(port, () => {
  console.log(`ready at http://localhost:${port}🚀 `)
})
