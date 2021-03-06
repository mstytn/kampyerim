const { model, Schema } = require('mongoose')

/**
 * Kamplar için mongo şeması
 */
const campSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  placename: String,
  postalcode: String,
  place: String,
  region: String,
  description: { 
    type: String, 
    default: '' 
  },
  images: { 
    type: [String], 
    default: [] 
  },
  provinance: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})
/**
 * Kamp şemasına sadece bölgeleri filtrelemesi için
 * eklediğim statik fonksion
 * @returns {[String]} Bölge isimleri
 */
campSchema.statics.getProvinances = async function() {
  const allData = await this.find({}, 'provinance')
  return Array.from(new Set(allData.map(i => i.provinance)))
}

const Camp = model('camp', campSchema)

module.exports = Camp
