class UserLocation {
  constructor() {
    this.userLocation = undefined
    this.point = [32.866287, 39.925533]
  }

  async requestLocation() {
    return new Promise((res, rej) => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          this.point = [position.coords.longitude, position.coords.latitude]
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
      const response = await fetch('http://localhost:3000/camps/random', this.requestOptions)
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
  const tokenResponse = await fetch('http://localhost:3000/mapboxtoken/e72587d1b2ef43e9b6ec56f693612826', requestOptions)
  const mapboxToken = await tokenResponse.json()

  mapboxgl.accessToken = mapboxToken.data

  await uloc.requestLocation()
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: uloc.point,
    zoom: 5
  });

  const response = await fetch('http://localhost:3000/camps/cluster', requestOptions)
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
fc.featuredCampCreator().then(o => {
  o.displayFeatured()
  randomCamp()
  kamplist()
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

async function kamplist(additive = false) {
  if (uloc.userLocation)
    throw new Error('Not Implemented')
  const lister = document.querySelector('#list')
  if (!additive)
    lister.innerHTML = ''
  fc.data.slice(0, 9).forEach(k => {
    lister.insertAdjacentHTML('beforeend', campCard(k))
  })
}

function campCard(data) {
  const k = data
  return `
      <div class="card">
        <img src="${k.images[0]}" alt="dummy">
        <div class="card-info">
          <h4>${k.name}</h4>
          <p class="location"><i class="bi bi-geo-alt-fill"></i><span class="rl"></span>${k.region}</p>
          <p class="description">${k.description.substring(0, 400)}...</p>
          <a href="camp.html?id=${k._id}">daha fazla...</a>
        </div>
      </div>
    `
}
