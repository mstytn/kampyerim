class Kampi {
  constructor(backendOrigin = 'http://localhost:3000') {
    this.backendOrigin = backendOrigin
    this.id = this.#getId()
    if (!this.id) {
      document.querySelector('.preload-message').innerText = "Kamp bulunamadı"
      this.#redirect()
    }
    this.camp = undefined
    this.myHeaders = new Headers()
    this.myHeaders.append('Accept', '*/*');
    this.myHeaders.append('Content-Type', 'application/json')
    this.myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    this.requestOptions = {
      method: 'GET',
      headers: this.myHeaders,
      redirect: 'follow',
    }
  }

  async fetchGet(route) {
    const res = await fetch(this.backendOrigin + route, this.requestOptions)
    const data = await res.json()
    return data
  }

  async fetchPost(route, requestBody) {
    const res = await fetch(this.backendOrigin + route, this.body(requestBody))
    const data = await res.json()
    return data
  }

  body(requestBody) {
    return {
      method: 'POST',
      headers: this.myHeaders,
      redirect: 'follow',
      body: JSON.stringify(requestBody)
    }
  }

  #getId() {
    const search = document.location.search.substring(1)
    if (!search || search.length < 1)
      return undefined
    const req = search.split('=')
    if (req.length < 2)
      return undefined
    if (req[0] !== 'id')
      return undefined
    return req[1]
  }

  #redirect() {
    setTimeout(() => { 
      document.location.href = 'index.html'
    }, 4000)
  }

  async getCampInfo() {
    let data
    if (this.camp)
      return this.camp
    try {
      data = await this.fetchGet('/camps/camp/' + this.id)
      if (!data.success)
        document.querySelector('.preload-message').innerText = "Kamp bulunamadı"
    } catch (error) {
      document.querySelector('.preload-message').innerText = "Beklenmeyen Hata"
    }
    if (!data)
      this.#redirect()
    if (!data.success)
      this.#redirect()
    this.camp = data.data
    return this.camp
  }
}
class UserLocation {
  constructor() {
    this.userLocation = undefined
    this.point = [32.866287, 39.925533]
    this.isPointGathered = false
  }

  async requestLocation() {
    return new Promise((res, rej) => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          this.point = [position.coords.longitude, position.coords.latitude]
          this.isPointGathered = true
          res({ type: "Point", location: [position.coords.latitude, position.coords.longitude]})
        }, err => rej(err))
      }
    })
  }
}

class Page {
  constructor() {
    this.appPage = document.querySelector('.apppage')
    this.preloader = document.querySelector('.preloader')
    this.appBgImage = document.querySelector('.bg-image')
    this.pageHeader = document.querySelector('.page__header__title')
    this.pageSubtitle = document.querySelector('.page__header__subtitle')
    this.pageLocation = document.querySelector('.page__header__location > span')
    this.campInfoHeader = document.querySelector('.camp__info__header__h')
    this.campInfoParagraph = document.querySelector('.camp__info__header__p')
    this.weatherExpandButton = document.querySelector('.expander')
    this.weatherExpandButtonIcon = document.querySelector('.expander > i.bi')
    this.weahterInfo = document.querySelector('.weather')
    this.weatherInfoExpanded = false
    this.weatherToday = {
      day: document.querySelector('#gun1 > h3'),
      icon: document.querySelector('#gun1 img'),
      min: document.querySelector('#gun1 .min'),
      now: document.querySelector('#gun1 .now'),
      max: document.querySelector('#gun1 .max'),
    }
    this.weatherNext = []
    for (let i = 2; i < 5; i++) {
      const day = document.querySelector(`#gun${i} > h3`)
      const icon =  document.querySelector(`#gun${i} img`)
      const min = document.querySelector(`#gun${i} .min`)
      const max = document.querySelector(`#gun${i} .max`)
      this.weatherNext.push({day, icon, min, max})
    }
    this.#hook()
  }

  removePreloader() {
    document.querySelector('body').removeChild(this.preloader)
  }

  async showAppPage(data) {
    await this.#updatePage(data)
    this.appPage.classList.add('visible')
  }

  async #updatePage(data) {
    const bgstyle = document.querySelector('body').style
    bgstyle.backgroundImage = `url(${data.images[0]})`
    bgstyle.backgroundRepeat = 'no-repeat'
    bgstyle.backgroundAttachment = 'fixed'
    bgstyle.backgroundPosition = 'center'
    bgstyle.backgroundSize = 'cover'
    this.pageHeader.innerText = data.name
    this.pageSubtitle.innerText = data.placename.replace(', Turkey', '').replace(/\d+/g, '')
    this.pageLocation.innerText = `${data.place} / ${data.region}`
    this.campInfoHeader.innerText = data.name
    this.campInfoParagraph.innerText = data.description
  }

  #hook() {
    this.weatherExpandButton.addEventListener('click', this.#weatherExpand)
  }

  #weatherExpand = (event) => {
    if (!this.weatherInfoExpanded)
    {
      this.weahterInfo.classList.add('expanded')
      this.weatherInfoExpanded = true
      setTimeout(() => {
        this.weatherExpandButtonIcon.classList.remove('bi-chevron-compact-right')
        this.weatherExpandButtonIcon.classList.add('bi-chevron-compact-left')
      }, 500)
    } else {
      this.weahterInfo.classList.remove('expanded')
      this.weatherInfoExpanded = false
      setTimeout(() => {
        this.weatherExpandButtonIcon.classList.remove('bi-chevron-compact-left')
        this.weatherExpandButtonIcon.classList.add('bi-chevron-compact-right')
      }, 500)
    }
  }

  updateWeather(wData) {
    const { temp, temp_min, temp_max } = wData.data.weather.main
    const icon = wData.data.weather.weather[0].icon
    this.weatherToday.icon.src = `imgs/${icon}.png`
    this.weatherToday.min.innerText = Math.round(temp_min)
    this.weatherToday.max.innerText = Math.round(temp_max)
    this.weatherToday.now.innerText = Math.round(temp)
    console.log(wData.data.dailyWeather)
    if (!wData.data.dailyWeather)
      this.weatherExpandButton.style.display = 'none'
    wData.data.dailyWeather.forEach((data, index) => {
      const weekdadays = [
        "Pzr",
        "Pzt",
        "Sal",
        "Çrş",
        "Prş",
        "Cum",
        "Cts"
      ]
      const dt = new Date(data.dt_txt)
      const theDate = weekdadays[dt.getDay()]
      const { min_temp, max_temp } = data
      const icon = data.weather[0].icon
      this.weatherNext[index].icon.src = `imgs/${icon}.png`
      this.weatherNext[index].min.innerText = Math.round(min_temp)
      this.weatherNext[index].max.innerText = Math.round(max_temp)
      this.weatherNext[index].day.innerText = theDate
    })
  }
}

class MyMapbox {
  constructor() {
    this.map = undefined
    this.token = 'e72587d1b2ef43e9b6ec56f693612826'
  }

  async getToken() {
    return await kampi.fetchGet('/mapboxtoken/' + this.token)
  }

  createMap = (location) => {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: location,
      zoom: 10
    })

    this.map.on('load', function() {
      const marker = new mapboxgl.Marker()
      marker.setLngLat(location)
      marker.addTo(this)
    })
  }

  
}

class Weather {
  constructor() {
    this.coordinates = undefined
    this.postalcode = undefined
  }

  updateCampInfo(coordinates, postalcode) {
    this.coordinates = coordinates
    this.postalcode = postalcode
  }

  async getTheWeather() {
    if (!this.coordinates || !this.postalcode)
      return null
    const requester = {
      coordinates: this.coordinates,
      postalcode: this.postalcode
    }
    const data = await kampi.fetchPost('/weatherdata', requester)
    return data.data
  }
}

const page = new Page()
const kampi = new Kampi()
const uLoc = new UserLocation()
const myMapBox = new MyMapbox()
const weather = new Weather()

async function main() {
  try {
  await uLoc.requestLocation()
  } catch {}
  const campInfo = await kampi.getCampInfo()
  await page.showAppPage(campInfo)
  page.removePreloader()
  // mapboxgl.accessToken = (await myMapBox.getToken()).data
  // myMapBox.createMap(campInfo.location.coordinates)
  weather.updateCampInfo(campInfo.location.coordinates, campInfo.postalcode)
  // const wData = await weather.getTheWeather()
  // console.log(wData)
  const wData = {
    "coordinates": [
        28.9888859,
        41.1836765
    ],
    "zipcode": "34473",
    "expiration": 1653778478924,
    "data": {
        "weather": {
            "coord": {
                "lon": 28.9889,
                "lat": 41.1837
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "kapalı",
                    "icon": "04n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 22.5,
                "feels_like": 22.58,
                "temp_min": 18.53,
                "temp_max": 25.29,
                "pressure": 1011,
                "humidity": 68,
                "sea_level": 1011,
                "grnd_level": 994
            },
            "visibility": 10000,
            "wind": {
                "speed": 0.53,
                "deg": 97,
                "gust": 0.88
            },
            "clouds": {
                "all": 91
            },
            "dt": 1653767658,
            "sys": {
                "type": 1,
                "id": 6970,
                "country": "TR",
                "sunrise": 1653705361,
                "sunset": 1653758815
            },
            "timezone": 10800,
            "id": 6940491,
            "name": "Arıköy",
            "cod": 200
        },
        "dailyWeather": [
            {
                "dt_txt": "2022-05-29 12:00:00",
                "min_temp": 19,
                "max_temp": 23,
                "max_humidity": 83,
                "wind": {
                    "speed": 4.16,
                    "deg": 36,
                    "gust": 4.81
                },
                "clouds": {
                    "all": 5
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "açık",
                        "icon": "01d"
                    }
                ],
                "wheather_icon": "http://openweathermap.org/img/wn/undefined@2x.png"
            },
            {
                "dt_txt": "2022-05-30 12:00:00",
                "min_temp": 19,
                "max_temp": 26,
                "max_humidity": 75,
                "wind": {
                    "speed": 5.3,
                    "deg": 263,
                    "gust": 8.36
                },
                "clouds": {
                    "all": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "açık",
                        "icon": "01d"
                    }
                ],
                "wheather_icon": "http://openweathermap.org/img/wn/undefined@2x.png"
            },
            {
                "dt_txt": "2022-05-31 12:00:00",
                "min_temp": 18,
                "max_temp": 23,
                "max_humidity": 85,
                "wind": {
                    "speed": 3.84,
                    "deg": 13,
                    "gust": 4.03
                },
                "clouds": {
                    "all": 40
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "parçalı az bulutlu",
                        "icon": "03d"
                    }
                ],
                "wheather_icon": "http://openweathermap.org/img/wn/undefined@2x.png"
            }
        ]
    }
  }


  page.updateWeather(wData)
}

main()