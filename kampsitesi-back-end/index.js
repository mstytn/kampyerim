// jshint ignore: start

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Camp = require('./models/camp')
const CampResponse = require('./models/response')
const { getDirections } = require('./models/mapbox')

mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`).then(() => console.log('mongoose Connected')).catch(console.error)

const corsOptions = {
  origin: process.env.origin,
  credentials:true,
  optionSuccessStatus: 200,
}



app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({success: true, message: "underConstruction"})
})

app.get('/camps/:provinance', async (req, res) => {
  const query = req.params.provinance.replace(/\{|\}|\:|\$/gi, '')
  const result = await Camp.find({provinance: query})
  res.send(result)
})

app.get('/provinances', (req, res) => {
  Camp.getProvinances().then(data => 
    res.json(new CampResponse(true, data.length, data))
  ).catch(e => res.sendStatus(403))
})


app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})
