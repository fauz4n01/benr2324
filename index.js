const express = require('express')
const app = express()
const port = process.env.PORT || 2000;

app.use(express.json())

app.get('/', (req, res) => {
   res.send('bruh lol')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})