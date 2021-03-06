const backendOrigin = 'https://kampisitesi.herokuapp.com'
const myHeaders = new Headers();
myHeaders.append('Accept', '*/*');
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
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
    const response = await fetch(backendOrigin + '/geoloc', requseOptions)
    const data = await response.json()
    return data
  }
}

class FeaturedCaps {
  constructor(featuredListQuery) {
    this.featuredList = document.querySelector(featuredListQuery)
    this.fCamps = ''
    this.data = undefined
  }
  async featuredCampGetter(count = 5) {
    this.myHeaders = new Headers();
    this.myHeaders.append('Accept', '*/*');
    this.myHeaders.append('Content-Type', 'application/json')
    this.myHeaders.append('Accept-Encoding', 'gzip, deflate, br');

    this.requestOptions = {
      method: 'GET',
      headers: this.myHeaders,
      redirect: 'follow'
    }
    let data
    while (!data) {
      const response = await fetch(backendOrigin + '/camps/random', this.requestOptions)
      data = await response.json()
      if (data.success) {
        this.data = data.data
        return data.data.slice(0, count)
      }
    }
  }

  async featuredCampCreator() {
    const data = await this.featuredCampGetter()
    data.forEach((d, i) => {
      if (i < 4)
        this.fCamps += `
          <a href="camp.html?id=${d._id}" class="featured-camp" data-link="${d._id}">
            <div class="featured-camp__img">
              <img src="${d.images[0]}" alt="${d.name.toLowerCase()}">
              </div>
            <img class="dummy" src="imgs/loader.gif" alt="dummy">
            <div class="featured-camp__info">
              <h3>${d.name.toLowerCase()}</h3>
              <p><i class="bi bi-geo-alt-fill"></i> ${d.region}</p>
            </div>
          </a>
        `
    })
    return this
  }

  displayFeatured() {
    if (this.fCamps || this.fCamps !== '')
    {
      this.featuredList.innerHTML = ''
      this.featuredList.insertAdjacentHTML('afterbegin', this.fCamps)
      this.featuredList.addEventListener('mouseover', async (e) => {
        const id = e.target.getAttribute('data-link')
        if (id) {
          const res = await fetch(backendOrigin + '/camps/camp/' + id)
          const data = await res.json()
          if (data)
            if (data.success) {
              const flyer = data.data.location.coordinates
              if (map) {
                map.flyTo({
                  center: flyer,
                  zoom: 9,
                  essential: true // this animation is considered essential with respect to prefers-reduced-motion
                  });
              }
            }
        }
      })
      this.featuredList.addEventListener('mouseout', () => {
        if (map) {
          map.flyTo({
            center: uloc.point,
            zoom: 4,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        }
      })
    }
  }
}

async function showMap() {
  const myHeaders = new Headers();
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }
  const tokenResponse = await fetch(backendOrigin + '/mapboxtoken/e72587d1b2ef43e9b6ec56f693612826', requestOptions)
  const mapboxToken = await tokenResponse.json()

  mapboxgl.accessToken = mapboxToken.data

  try {
    await uloc.requestLocation()
  } catch {}
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: uloc.point,
    zoom: 4
  });

  const response = await fetch(backendOrigin + '/camps/cluster', requestOptions)
  const cluster = await response.json()

  map.on('load', async function() {
      map.addSource('kampyerleri', {
      type: 'geojson',
      data: cluster.data,
      cluster: true,
      clusterMaxZoom: 8,
      clusterRadius: 50
    })

    map.setLayoutProperty('country-label', 'text-field', [
      'get',
      `name_tr`
      ])

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'kampyerleri',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          25,
          '#f1f075',
          50,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });
  
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'kampyerleri',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });
  
    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'kampyerleri',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });
  });

    // inspect a cluster on click
  map.on('click', 'clusters', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource('kampyerleri').getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
      }
    );
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.
  map.on('click', 'unclustered-point', async (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const id = e.features[0].properties._id;
    const res = await fetch(backendOrigin + '/camps/camp/' + id)
    const data = await res.json()
    const {name, _id, place, region, images} = data.data


    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
        `<h3>${name}</h3>
        <img src="${images[0]}" alt="${name}" width="100%">
        <p>${place} / ${region}</p>
        <a href="camp.html?id=${_id}">daha fazla...</a>
        `
      )
      .addTo(map);
  });

  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
  });

  return map
}

class Menugator {
  constructor(menuselector, displayClass) {
    this.menuElement = document.querySelector(menuselector)
    this.buttonElement = document.querySelector(menuselector + ' button')
    this.iconElement = document.querySelector(menuselector + ' button > i')
    this.insideMenuElement = document.querySelector(menuselector + ' .navnav')
    this.isOpen = false
    this.isHover = false
    this.displayClass = displayClass
    this.#hook()
  }

  toggle() {
    if (this.isOpen) {
      this.menuElement.classList.remove(this.displayClass)
      this.buttonElement.classList.remove('trans')
      this.iconElement.classList.remove('bi-x')
      this.iconElement.classList.add('bi-list')
      this.insideMenuElement.classList.remove('show')
      this.isOpen = false
    } else {
      this.menuElement.classList.add(this.displayClass)
      this.buttonElement.classList.add('trans')
      this.iconElement.classList.add('bi-x')
      this.iconElement.classList.remove('bi-list')
      this.insideMenuElement.classList.add('show')
      this.isOpen = true
    }
  }

  #hook() {
    if (this.menuElement) {
      this.buttonElement.addEventListener('click', this.clickEvent)
      this.buttonElement.addEventListener('mouseover', this.hoverEvent)
      this.buttonElement.addEventListener('mouseout', this.hoverEvent)
      document.querySelectorAll('.navul > li > a').forEach(nv => {
        nv.addEventListener('click', () => {
          setTimeout(() => {
            this.toggle()
          }, 300)
        })
      })
    }
  }

  clickEvent = (event) => {
    this.toggle()
  }

  hoverEvent = (event) => {
    if (event.type === 'mouseover')
      this.isHover = true
    else
      this.isHover = false 
    if (this.isHover) {
      this.iconElement.classList.remove('bi-x', 'bi-list')
      if (this.isOpen)
        this.iconElement.classList.add('bi-caret-right')
      else
        this.iconElement.classList.add('bi-caret-left')
    } else {
      this.iconElement.classList.remove('bi-caret-left', 'bi-caret-right')
      if (this.isOpen)
        this.iconElement.classList.add('bi-x')
      else
        this.iconElement.classList.add('bi-list')
    }
  }
}

const menu = new Menugator('.navholder', 'shownav')

const uloc = new UserLocation()
let map
showMap().then(mp => {map = mp})
const fc = new FeaturedCaps('.featured-campgrid')

//SECTION: Unintentionally created entry point for appjs
fc.featuredCampCreator().then(async (o) => {
  try {
    await uloc.requestLocation()
  } catch {
    // console.log('cannot get user location')
  }
  o.displayFeatured()
  randomCamp()
  kamplist()
  addBolgeFilteringSelector()
})

function randomCamp() {
  const {_id, images, description, name, placename, region} = fc.data[4]
  
  const rh = document.querySelector('.rh')
  const ra = document.querySelector('.ra')
  const rl = document.querySelector('.rl')
  const rp = document.querySelector('.rp')
  const rf = document.querySelector('.rf')
  const ri = document.querySelector('.ri')

  rh.innerText = name
  ra.innerText = placename.replace(', Turkey', '')
  rl.innerText = region
  rp.innerText = description
  rf.href = 'camp.html?id=' + _id
  ri.src = images[0]
}

async function kamplist() {
  if (uloc.isPointGathered)
  {
    const nearme = await requestNearMe()
    const nFilt = nearme.data.filter((_v,i) => i < 9)
    createKampList(nFilt, `Size en yak??n ${nFilt.length} kamp alan?? g??r??nt??leniyor`)
  } else {
    const data = fc.data.slice(0, 9)
    createKampList(data, `Lokasyon bilginize ula??amad??????m??zdan rastgele 9 kamp b??lgesi g??r??n??tleniyor`, 'error')
  }
}

function createKampList(camps, message, messageType = 'info', additive = false) {
  const filterResonseElement = document.querySelector('.kamplistesi > p')
  const lister = document.querySelector('#list')
  if (!additive)
    lister.innerHTML = ''
  camps.forEach(v => {
      lister.insertAdjacentHTML('beforeend', campCard(v))
  })
  if (messageType === 'info')
    filterResonseElement.classList.remove('error')
  if (messageType === 'error')
    filterResonseElement.classList.add('error')
  filterResonseElement.innerText = message
}

async function requestNearMe() {
  const myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    const reqBody = { distance: 50000, lon: uloc.point[0], lat: uloc.point[1]}
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(reqBody)
    }
    const response = await fetch(backendOrigin + '/camps/nearme', requestOptions)
    const data = await response.json()
    return data
}

function campCard(data) {
  const k = data
  let d = ''
  if (k.distance) {
    d = `
      <p class="distance">
        <i class="bi bi-signpost"></i>
        <span> ${Math.floor(k.distance / 1000)}km</span>
      </p>
    `
  }
  const theImage = (k.images.length === 0) ? "imgs/dummy.png" : k.images[0]

  return `
      <div class="card">
        <img src="${theImage}" alt="${k.name}">
        <img class="loader" src="imgs/loader.gif" alt="preloader">
        <div class="card-info">
          <h4>${k.name}</h4>
          <p class="location"><i class="bi bi-geo-alt-fill"></i><span class="rl"></span>${k.region}</p>
          <p class="description">${k.description.substring(0, 400)}...</p>
          <a href="camp.html?id=${k._id}">daha fazla...</a>
          ${d}
        </div>
      </div>
    `
}

async function addBolgeFilteringSelector() {
  const response = await fetch(backendOrigin + '/provinances', requestOptions)
  const data = await response.json()
  const bolgeElement = document.querySelector('#bolge')
  const regionElement = document.querySelector('#il')
  const placeElement = document.querySelector('#ilce')
  bolgeElement.innerHTML = `<option value="">Se??iniz</option>`
  data.data.forEach(d => {
    bolgeElement.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`)
  })
  resetFilters()
  bolgeElement.addEventListener('change', e => {selectorUpdater(e.target)})
  regionElement.addEventListener('change', e => {selectorUpdater(e.target)})
  placeElement.addEventListener('change', e => {selectorUpdater(e.target)})
}

document.querySelector('.clean-filters > button').addEventListener('click', () => {
  resetFilters()  
})

function resetFilters() {
  const bolgeElement = document.querySelector('#bolge')
  const ilElement = document.querySelector('#il')
  const ilceElement = document.querySelector('#ilce')
  const filterButton = document.querySelector('.clean-filters')
  const filterButtonItself = document.querySelector('.clean-filters > button')
  filterButtonItself.disabled = true
  filterButton.classList.remove('filtered')
  ilElement.disabled = true
  ilceElement.disabled = true
  bolgeElement.value = ''
  ilElement.innerHTML = `<option value="" default>Se??iniz</option>`
  ilceElement.innerHTML = `<option value="" default>Se??iniz</option>`
  kamplist()
}

async function selectorUpdater(targetElement) {
  const provinanceElement = document.querySelector('#bolge')
  const regionElement = document.querySelector('#il')
  const placeElement = document.querySelector('#ilce')
  selectorDisabler()
  const data = await filter(provinanceElement.value, regionElement.value, placeElement.value, targetElement)
  selectorEnabler()
  if (data) {
    const message = `${provinanceElement.value} ${regionElement.value} ${placeElement.value} i??in ${data.length} kamp alan?? liteleniyor`
    createKampList(data, message)
  }
}

function selectorDisabler() {
  const provinanceElement = document.querySelector('#bolge')
  const regionElement = document.querySelector('#il')
  const placeElement = document.querySelector('#ilce')
  provinanceElement.disabled = true
  regionElement.disabled = true
  placeElement.disabled = true
}

function selectorEnabler() {
  const provinanceElement = document.querySelector('#bolge')
  const regionElement = document.querySelector('#il')
  const placeElement = document.querySelector('#ilce')
  if (provinanceElement.options.length > 1)
    provinanceElement.disabled = false
  if (regionElement.options.length > 1)
    regionElement.disabled = false
  if (placeElement.options.length > 1)
    placeElement.disabled = false
}

async function filter(provinance, region, place, targetElement) {
    const provinanceElement = document.querySelector('#bolge')
    const regionElement = document.querySelector('#il')
    const placeElement = document.querySelector('#ilce')
    const filterButton = document.querySelector('.clean-filters')
    const filterButtonItself = document.querySelector('.clean-filters > button')
    
    const selectMessage = `<option value="" default>Se??iniz</option>`
    if (targetElement.id === 'bolge') {
      region = ''
      place = ''
      regionElement.innerHTML = selectMessage
      placeElement.innerHTML = selectMessage
      selectorDisabler()
    }
    if (targetElement.id === 'il') {
      place = ''
      placeElement.innerHTML = selectMessage
      selectorDisabler()
    }
    if (provinance === '' && region === '' && place === '')
    {
      resetFilters()
      kamplist()
      return
    }
      
  const myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    const reqBody = {
      region: region,
      provinance: provinance,
      place: place,
    }
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(reqBody)
    }
    const response = await fetch(backendOrigin + '/camps/filter', requestOptions)
    const data = await response.json()
    if (!data.success) {
      resetFilters()
      kamplist()
      return
    } else {
      if (provinanceElement.selectedIndex > 0) {
        filterButton.classList.add('filtered')
        filterButtonItself.disabled = false
      }
      if (provinance !== '' && region === '') {
        const regions = data.data.map(d => d.region)
        const regionsSelectorData = Array.from(new Set(regions)).sort().filter(v => v != undefined)
        regionElement.innerHTML = selectMessage
        regionsSelectorData.forEach(d => {
          regionElement.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`)
        })
      }
      if (region !== '' && place === '') {
        const places = data.data.map(d => d.place)
        const placesSelectoData = Array.from(new Set(places)).sort().filter(v => v != undefined)
        placeElement.innerHTML = selectMessage
        placesSelectoData.forEach(d => {
          placeElement.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`)
        })
      }
    }
    return data.data
}