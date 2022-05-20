const axios = require('axios').default
const fs = require('fs')

module.exports = class OpenWeather {
  constructor() {
    this.key = process.env.OPEN_WEATHER
    this.previousRequests = this.readPrev()
  }

  readPrev() {
    try {
      const d = require('../owhist.json')
      return d
    } catch (e) {
      return []
    }
  }

  writePrev() {
    const jsonString =  JSON.stringify(this.previousRequests)
    fs.writeFileSync('./owhist.json', jsonString)
  }

  async getWeaterData(coordinates, zipcode) {
    const requester = this.requesterIsExpired(zipcode)
    if (requester.expired) {
      const data = await this.getWeatherDataOnline(coordinates, zipcode)
      if (requester.found === -1) {
        this.previousRequests.push(data)
      }
      else {
        this.previousRequests[requester.found] = data
      }
      this.writePrev()
      return data
    }
    else  {
      return this.getWeatherDataFromPrevious(requester.found)
    }
  }

  async getWeatherDataOnline(coordinates, zipcode) {
    const now = new Date()
    const weather = await this.getWeather(coordinates)
    const rawDailyWeather = await this.getDailyWeather(zipcode)
    const dailyWeather = this.parseWeatherData(rawDailyWeather)
    const expiration = new Date(now.getTime() + ( 3 * 60 * 60 * 1000)).getTime()
    return {
      coordinates,
      zipcode,
      expiration,
      data: {
        weather,
        dailyWeather,
      }
    }
  }

  getWeatherDataFromPrevious(index) {
    return this.previousRequests[index]
  }

  requesterIsExpired(zipcode) {
    const now = new Date()
    // console.log(zipcode)
    // console.log(this.previousRequests)
    const index = this.previousRequests.findIndex(i => i.zipcode === zipcode)
    // console.log(index)
    if (index === -1)
      return { found: index, expired: true }
    const expiration = this.previousRequests[index].expire
    if (now > expiration)
      return { found: index, expired: true}
    return {found: index, expired: false}
    
  }

  async getWeather(coordinates) {
    const qString = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&lang=tr&units=metric&appid=${this.key}`

    const res = await axios.get(qString)
    return res.data
  }
  async getDailyWeather(zipcode) {
    const qString = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},tr&lang=tr&units=metric&appid=${this.key}`

    const res = await axios.get(qString)
    return res.data
  }
  parseWeatherData(data) {
    const today = new Date(data.list[0].dt_txt)
    const days = []
    
    for (let i = 0; i <= 5; i++) {
      let l = []
      data.list.forEach(
        d => {
          const date = new Date(d.dt_txt)
          if (date.getDate() == today.getDate())
            l.push(d)
        }
      )
      if (l.length > 0 && i > 0 && i < 4) {
        days.push(l)
      }
      today.setDate(today.getDate() + 1)
    }

    const daysRed = []
    days.forEach(d => {
      const min_temp = Math.round(Math.min(...d.map(i => i.main.temp)))
      const max_temp = Math.round(Math.max(...d.map(i => i.main.temp)))
      const max_humidity = Math.max(...d.map(i => i.main.humidity))
      daysRed.push({
        dt_txt: d[4].dt_txt, 
        min_temp, 
        max_temp, 
        max_humidity,
        wind: d[4].wind,
        clouds: d[4].clouds,
        weather: d[4].weather,
        wheather_icon: OpenWeather.getWeatherIcon(d[4].weather.icon)
      })
    })
    return (daysRed)
  }

  static getWeatherIcon(iconId) {
    return `http://openweathermap.org/img/wn/${iconId}@2x.png`
  }
}