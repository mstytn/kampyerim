// jshint ignore: start
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