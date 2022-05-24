class UserLocation {
  constructor() {
    this.userLocation = undefined
  }

  async requestLocation() {
    return new Promise((res, rej) => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          res({ type: "Point", location: [position.coords.latitude, position.coords.longitude]})
        }, err => rej(err))
      }
    })
  }

  async getPlace() {
    const userLocation = await this.requestLocation()
    const myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    this.userLocation = userLocation
    const reqBody = { loc: userLocation.location}
    const requseOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(reqBody)
    }
    const response = await fetch('http://localhost:3000/geoloc', requseOptions)
    const data = await response.json()
    return data
  }
}


class FeaturedCaps {
  constructor(featuredListQuery) {
    this.featuredList = document.querySelector(featuredListQuery)
    this.fCamps = ''
  }
  async #featuredCampGetter() {
    this.myHeaders = new Headers();
    this.myHeaders.append('Accept', '*/*');
    this.myHeaders.append('Content-Type', 'application/json')
    this.myHeaders.append('Accept-Encoding', 'gzip, deflate, br');

    this.requestOptions = {
      method: 'GET',
      headers: this.myHeaders,
      redirect: 'follow'
    }
    const response = await fetch('http://localhost:3000/camps/random', this.requestOptions)
    const data = await response.json()
    if (data.success)
      return data.data.slice(0, 4)
  }

  async featuredCampCreator() {
    const data = await this.#featuredCampGetter()
    console.log(data)
    data.forEach(d => {
      this.fCamps += `
        <div class="featured-camp">
          <div class="featured-camp__img">
            <img src="${d.images[0]}" alt="${d.name.toLowerCase()}">
            </div>
          <img class="dummy" src="imgs/dummy.png" alt="dummy">
          <div class="featured-camp__info">
            <h3>${d.name.toLowerCase()}</h3>
            <p><i class="bi bi-geo-alt-fill"></i> ${d.region}</p>
          </div>
        </div>
      `
    })
    return this
  }
}

const fc = new FeaturedCaps('.featured-campgrid')
fc.featuredCampCreator().then(
  o => { 
    o.featuredList.innerHTML = ''
    o.featuredList.insertAdjacentHTML('beforeend', o.fCamps)
  }
)



// const uloc = new UserLocation()
// if (!uloc.userLocation)
//   uloc.getPlace().then(res => {
//     document.querySelector('span.youre-here').innerText = res.data.region
//   }).catch(() =>{
//     document.querySelector('span.youre-here').innerText = 'Bilinmiyor'
//   })
// uLoc.getPlace().then(console.log).catch(console.error)

