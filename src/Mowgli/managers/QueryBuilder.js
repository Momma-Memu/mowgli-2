export default class MowgliQueryBuilder {
  #baseRoute = "";

  // constructor() {}

  buildFromObj(obj) {
    const keys = Object.keys(obj);
    return "?" + keys.map(key => `${key}=${obj[key]}`).join("&");
  }
}