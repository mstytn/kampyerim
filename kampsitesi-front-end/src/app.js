const backendOrigin = 'http://localhost:3000'
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

  displayFeatured() {
    if (this.fCamps || this.fCamps !== '')
    {
      this.featuredList.innerHTML = ''
      this.featuredList.insertAdjacentHTML('afterbegin', this.fCamps)
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

  await uloc.requestLocation()
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: uloc.point,
    zoom: 5
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
  map.on('click', 'unclustered-point', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const mag = e.features[0].properties.mag;
    const tsunami =
      e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
        `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
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

const uloc = new UserLocation()
let map
// showMap().then(mp => {map = mp})
const fc = new FeaturedCaps('.featured-campgrid')
fc.featuredCampCreator().then(async (o) => {
  try {
    await uloc.requestLocation()
  } catch {
    console.log('cannot get user location')
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
    const nFilt = nearme.data.filter((v,i) => i < 9)
    createKampList(nFilt, `Size en yakın ${nFilt.length} kamp alanı görüntüleniyor`)
  } else {
    const data = fc.data.slice(0, 9)
    createKampList(data, `Lokasyon bilginize ulaşamadığımızdan rastgele 9 kamp bölgesi görünütleniyor`, 'error')
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
  if (messageType = 'info')
    filterResonseElement.classList.remove('error')
  if (messageType == 'error')
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
        <img src="${theImage}" alt="dummy">
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
  bolgeElement.innerHTML = `<option value="">Seçiniz</option>`
  data.data.forEach(d => {
    bolgeElement.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`)
  })
  resetFilters()
  bolgeElement.addEventListener('change', e => {selectorUpdater(e.target)})
  regionElement.addEventListener('change', e => {selectorUpdater(e.target)})
  placeElement.addEventListener('change', e => {selectorUpdater(e.target)})
}

document.querySelector('.clean-filters > button').addEventListener('click', e => {
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
  ilElement.innerHTML = `<option value="" default>Seçiniz</option>`
  ilceElement.innerHTML = `<option value="" default>Seçiniz</option>`
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
    const message = `${provinanceElement.value} ${regionElement.value} ${placeElement.value} için ${data.length} kamp alanı liteleniyor`
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
    
    const selectMessage = `<option value="" default>Seçiniz</option>`
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