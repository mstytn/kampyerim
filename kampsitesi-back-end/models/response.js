const Camp = require('./camp')
const qOptions = require('./querylimiter')
const { findPlace } = require('./mapbox')

/**
 * Serverdan dönen yer bilgisini standardize etmen için aracı sınıf
 */
module.exports = class CampResponse {
  constructor(success, length, data) {
    this.success = success
    this.length = length
    this.data = data
  }

  jsonString() {
    return JSON.stringify(this)
  }

  static async getProvinanceList() {
    try {
      const resp = await Camp.getProvinances()
      return new CampResponse(true, resp.length, resp)
    }
    catch (e) {
      return new CampResponse(false, 0, e.message)
    }
  }

  static async getCampsInProvinance(query) {
    try {
      const q = qOptions.limitQuery(query)
      const camps = await Camp.find({provinance: q})
      return new CampResponse(true, camps.length, camps)
    }
    catch (e) {
      return new CampResponse(false, 0, e.message)
    }
  }

  static async filterCamps(formData) {
    const queryList = {}
    for (const prop in formData) {
      const propCheck = qOptions.propLimiter(prop)
      if (propCheck) {
        if (formData[prop] && formData[prop].length > 0)
          queryList[prop] = qOptions.limitQuery(formData[prop])
      }
    }
    if (Object.keys(queryList).length > 0) {
      const result = await Camp.find(queryList)
      return new CampResponse(true, result.length, result)
    } else {
      return new CampResponse(false, 0, 'Filtreleme kriterleriniz ile ilgili bir sorun var')
    }
  }

  static async getGeoObj(somedata) {
    if (somedata) {
      const result = await findPlace(somedata.reverse())
      console.log(result)
      return result
    } return undefined
  }

  static async getRandomCamp() {
    const mReult = await Camp.aggregate([{ $sample: {size: 20}}])
    const result = mReult.filter(m => m.images.length > 0)
    if (result.length >= 10)
      return new CampResponse(true, 10, result.slice(0, 10))
    else
      return new CampResponse(false, 0, [])
  }

  static async getClusterMap() {
    const wholeCapms = await Camp.find({})
    const cMap = wholeCapms.map(c => {
      const {_id, name, place, region, placename, provinance, location} = c
      return {
        type: "Feature",
        properties: {
          _id,
          name,
        },
        geometry: {...location}
      }
    })
    const scMap = {
      type: "FeatureCollection",
      features: [...cMap]
    }
    return new CampResponse(true, cMap.length, scMap)
  }
}