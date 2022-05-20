module.exports = class QueryOptions {
  constructor() {

  }

  static limitQuery(query) {
    return query.replace(/\{|\}|\:|\$/gi, '')
  }

  static propLimiter(prop) {
    return (['place', 'region', 'provinance']).includes(prop) ? prop : undefined
  }
}