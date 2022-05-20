const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions')
const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({accessToken: mapBoxToken})
const directions = mbxDirections({accessToken: mapBoxToken})

/**
 * Mapbox Geocoding API ile Geocode Point verisinden yer ismi bulan metot
 * @param {[Number]} loc 
 * @returns And address Object with place, region and postcodes
 */
async function findPlace(loc) {
    const q = {
      query: loc,
      limit: 1
    }
    const response = await geocoder.reverseGeocode(q).send()
    const address = {}
    if (response.body) {
      const inf = response.body.features[0].context
      address.placename = response.body.features[0]['place_name']
      inf.forEach(i => {
        if (i.id.includes('place'))
          address.place = i.text
        else if (i.id.includes('region'))
          address.region = i.text
        else if (i.id.includes('postcode'))
          address.postalcode = i.text
      })
    }
    return address
}
/**
 * İki Geocode Point arasındaki mesafeyi veren Mapbox API'si
 * @param {[Number]} start 
 * @param {[Number]} end 
 * @returns Distance in kms
 */
async function getDirections(start, end) {
  const q = { 
    profile: 'driving',
    waypoints: [
      {
        coordinates: start, //[28.9802764, 41.07387]
      },
      {
        coordinates: end //[32.496888, 40.5783743]
      }
    ],
    geometries: "geojson",
    language: "tr",
    voiceUnits: "metric"
  }
  const response = await directions.getDirections(q).send()
  if (response.body) {
    return Math.floor(response.body.routes[0].distance / 1000)
  }
}

module.exports = { findPlace, getDirections }