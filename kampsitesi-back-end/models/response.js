// jshint ignore: start
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
}