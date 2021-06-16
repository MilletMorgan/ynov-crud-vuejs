const express = require("express")
const path = require("path")
const history = require("connect-history-api-fallback")

const app = express()

app.use(history())
app.use('/', express.static(path.join(__dirname), '../../dist'))

app.get('/', (req, res) => {
	res.send('hello')
})

app.listen(process.env.PORT || 5000, () => console.log("Server listening on port 3000"))
