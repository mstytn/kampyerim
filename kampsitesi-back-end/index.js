// jshint ignore: start

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Camp = require('./models/campmodel')
const CampResponse = require('./models/response')
const Op = require('./models/openweather')
const op = new Op()
// const { getDirections } = require('./models/mapbox')
// const qOptions = require('./models/querylimiter')

// const fs = require('fs')



// op.getDailyWeather(48900).then(data => {
//   fs.writeFileSync('./forecastdata.json', JSON.stringify(data))
// })

// op.parseWeatherData(require('./forecastdata.json'))
// `mongodb://localhost:27017/${process.env.DB}`
const mongostr = process.env.MONGO_STR || process.env.DB

mongoose.connect(mongostr)
  .then(() => console.log('mongoose Connected'))
  .catch(err => console.error(err))

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials:true,
  optionSuccessStatus: 200,
}
app.use(morgan('dev'))
app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  // BUG: REPLACE - ROMVE - DO SOMETHING
  // Camp.find({}).then(data => {res.json(new CampResponse(true, data.length, data))}).catch(e => {res.status(500).json(new CampResponse(false, 0, e.message))})
  // const data = require('./mongodmp.json')
  // Camp.insertMany(data).then(console.log).catch(console.error)
  res.send('Hello')
})

app.post('/weatherdata', async (req,res) => {
  const { coordinates, postalcode } = req.body
  console.log(coordinates.reverse(), postalcode)
  const wData = await op.getWeaterData(coordinates.reverse(), postalcode)
  res.json(new CampResponse(true, 1, wData))
})

app.post('/camps/nearme', (req, res) => {
  const {lon, lat, distance} = req.body
  const location = [+lon, +lat]
  CampResponse.nearAggregate(location, +distance).then(data => res.json(data))
})

app.post('/camps/filter', async (req, res) => {
  const result = await CampResponse.filterCamps(req.body)
  if (!result.success)
    return res.status(403).json(result)
  res.json(result)
})

app.get('/camps/random', async (req, res) => {
  const result = await CampResponse.getRandomCamp()
  res.json(result)
})

app.get('/camps/cluster', async (req, res) => {
  const result = await CampResponse.getClusterMap()
  res.json(result)
})

app.get('/camps/camp/:id', async (req, res) => {
  // BUG
  try {
    const result = await Camp.findById(req.params.id)
    return res.json(new CampResponse(true, 1, result))
  }
  catch (e) {
    return res.status(404).json(new CampResponse(false, 0, [{message: e.message}]))
  }
})
app.get('/camps/:provinance', async (req, res) => {
  const result = await CampResponse.getCampsInProvinance(req.params.provinance)
  res.send(result)
})

app.get('/provinances', async (_req, res) => {
  const result = await CampResponse.getProvinanceList()
  res.json(result)
})

app.post('/geoloc', async (req, res) => {
  const result = await CampResponse.getGeoObj(req.body.loc)
  res.json(new CampResponse(true, result.length, result))
})

app.get('/mapboxtoken/:token', (req, res) => {
  if (req.params.token === process.env.MAPREQ_TOKEN)
    res.json(new CampResponse(true, 1, process.env.MAPBOX_TOKEN))
  else
    res.status(403).json(new CampResponse(false, 0, {}))
})

app.use((err, req, res, next) => {
  res.status(500)
  res.json(new CampResponse(false, 0, [{message: err.message}]))
})

app.get('*', function(req, res){
  res.status(404).json(new CampResponse(false, 0, [{message: '404 İstek Bulunamadı'}]));
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
