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
    this.carousel = document.querySelector('.images__carousel'),
    this.fullcarousel = { 
      element: document.querySelector('.carousel'),
      isVisible: false,
      closeButton: document.querySelector('.carousel > button'),
      imageSelectorElement: document.querySelector('.carousel .img-selector'),
      carouselImages: document.querySelectorAll('.carousel > .img-selector > .img'),
      activeIndex: -1,
      mainImageElement: document.querySelector('.carousel .disimage > img'),
      carouselImageLinks: []
    }
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
    this.distance = document.querySelector('.road span')
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
    document.title = 'Kampi | ' + data.name
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

  updateDistance(distanceData) {
    if (distanceData)
      this.distance.innerText = distanceData + ' km'
  }

  #hook() {
    this.weatherExpandButton.addEventListener('click', this.#weatherExpand)
    this.carousel.addEventListener('click', this.#carouselClick)
    this.fullcarousel.closeButton.addEventListener('click', () => {
      this.#toggleFullCarousel()
    })
  }

  #carouselClick = (event) => {
    const imgIndex = event.target.getAttribute('data-index')
    console.log(imgIndex)
    this.#toggleFullCarousel(imgIndex, ["1", "2"])
  }

  #updateFullCarouselElements() {
    this.fullcarousel.element = document.querySelector('.carousel')
    this.fullcarousel.imageSelectorElement = document.querySelector('.carousel .img-selector')
    this.fullcarousel.carouselImages = document.querySelectorAll('.carousel > .img-selector > .img')
    this.fullcarousel.carouselImages.forEach((sel, i) => {
      sel.addEventListener('click', (event) => {
        this.fullcarousel.activeIndex = Number(event.target.parentElement.getAttribute('data-index'))
        this.#fullcarouselSelectorActivate()
      })
    })
  }

  #createFullScreenCarousel() {
    this.fullcarousel.carouselImageLinks.forEach((il, i) => {
      this.fullcarousel.imageSelectorElement.insertAdjacentHTML('beforeend', `
      <div class="img" data-index="${i}">
      <img src="${il}" alt="${il}">
    </div>
      `)
    })
    this.#updateFullCarouselElements()
  }

  createCraousel(imageLinks) {
    this.fullcarousel.carouselImageLinks = imageLinks
    this.fullcarousel.carouselImageLinks.forEach((il, i) => {
      this.carousel.insertAdjacentHTML('beforeend', `
        <div class="img" data-index="${i}">
          <img src="${il}" alt="${il}">
        </div>
      `)
    });
    this.#createFullScreenCarousel()
  }

  #toggleFullCarousel = (index = 0) => {

    // else {
    //   this.fullcarousel.activeIndex = index
    //   this.#fullcarouselSelectorActivate()
    // }
    this.fullcarousel.activeIndex = index
    this.#fullcarouselSelectorActivate()
    if (this.fullcarousel.isVisible) {
      this.fullcarousel.element.classList.remove('show')
      document.querySelector('body').style.overflow = 'auto'
      this.fullcarousel.isVisible = false
    } else {
      this.fullcarousel.element.classList.add('show')
      document.querySelector('body').style.overflow = 'hidden'
      this.fullcarousel.isVisible = true
    }
  }

  #fullcarouselSelectorActivate() {
    if (this.fullcarousel.carouselImageLinks.length < 2) {
      this.fullcarousel.imageSelectorElement.style.display = 'none'
      this.fullcarousel.mainImageElement.src = this.fullcarousel.carouselImages[this.fullcarousel.activeIndex].firstElementChild.src
      return
    } else {
      this.fullcarousel.imageSelectorElement.style.display = 'flex'
      this.fullcarousel.carouselImages.forEach(i => {i.classList.remove('active')})
      this.fullcarousel.carouselImages[this.fullcarousel.activeIndex].classList.add('active')
      this.fullcarousel.mainImageElement.src = this.fullcarousel.carouselImages[this.fullcarousel.activeIndex].firstElementChild.src
    }
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
    if (!wData.data.dailyWeather) {
      this.weatherExpandButton.style.display = 'none'
      return
    }
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
      style: 'mapbox://styles/mapbox/dark-v10',
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

class Distancer {
  constructor() {
    this.locdata = undefined
    this.camplocation = undefined
    this.distance = undefined
  }

  updateLocationData(loc, cloc) {
    this.locdata = loc
    this.camplocation = cloc
  }

  async getDistance() {
    
    if (!this.locdata || !this.camplocation)
      return {data: false}
    const requestBody = {location: this.locdata, camplocation: this.camplocation}
    const data = await kampi.fetchPost('/campdistance', requestBody)
    return data
  }
}

const page = new Page()
const kampi = new Kampi('https://kampisitesi.herokuapp.com')
const uLoc = new UserLocation()
const myMapBox = new MyMapbox()
const weather = new Weather()
const dist = new Distancer()

async function main() {
  try {
    await uLoc.requestLocation()
  } catch {}
  const campInfo = await kampi.getCampInfo()
  await page.showAppPage(campInfo)
  
  dist.updateLocationData(uLoc.point, campInfo.location.coordinates)
  page.removePreloader()
  mapboxgl.accessToken = (await myMapBox.getToken()).data
  myMapBox.createMap(campInfo.location.coordinates)
  weather.updateCampInfo(campInfo.location.coordinates, campInfo.postalcode)
  const wData = await weather.getTheWeather()
  if (uLoc.isPointGathered) {
    const distance = await dist.getDistance()
    page.updateDistance(distance.data)
  }
  page.updateWeather(wData)
  page.createCraousel(campInfo.images)
}

main()