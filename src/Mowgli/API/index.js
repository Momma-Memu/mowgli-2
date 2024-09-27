/** - The MowgliAPI manages all Fetch requests using a consistent REST API format. */
export default class MowgliAPI {
  // #baseUrl = "https://6f449e2ad40b.ngrok.app/api/";

  #baseUrl = "https://localhost:3000/api/";
  #defaultHeaders = { "Content-Type": "application/json" };
  #options = {
    credentials: "include"
  };

  #GET = "GET";
  #DELETE = "DELETE";
  #POST = "POST";
  #PUT = "PUT";

  /** - The MowgliAPI manages all Fetch requests using a consistent REST API format.
   * @param {string} baseUrl - URL Route/Path that the basic each CRUD Fetch is requested by. */
  constructor(baseUrl) {
    this.#baseUrl += baseUrl;
  }

  buildQueryString(obj) {
    const keys = Object.keys(obj);
    //`?id=someID&product=bag`;
    return keys.map(key => `?${key}=${obj[key]}`).join("&")
  }

  /** - GET Method Fetch Request.
   * @param {string} params - URL Route/Path parameters. */
  async GET(params = "") {
    return await this.#fetch(params, this.#GET, null);
  }

  /** - POST Method Fetch Request.
   * @param {string} params - URL Route/Path parameters. */
  async POST(params = "", body) {
    return await this.#fetch(params, this.#POST, body);
  }

  /** - PUT Method Fetch Request.
   * @param {string} params - URL Route/Path parameters. */
  async PUT(params = "", body) {
    return await this.#fetch(params, this.#PUT, body);
  }

  /** - DELETE Method Fetch Request.
   * @param {string} params - URL Route/Path parameters. */
  async DELETE(params = "") {
    return await this.#fetch(params, this.#DELETE, null);
  }

  async #fetch(url = "", method = this.#GET, body = {}, isForm = false) {
    const options = { method, ...this.#options };

    if (method !== this.#GET && method !== this.#DELETE) {
      // TODO: Determine if user uploadable files is needed...
      options.headers = isForm ? undefined : this.#defaultHeaders;
      options["body"] = isForm ? body : JSON.stringify(body);
    }

    try {
      const response = await window.fetch(`${this.#baseUrl}/${url}`, options);

      if (response.status >= 400) {
        throw response;
      }

      const data = await response.json();

      return [response, data];
    } catch (error) {
      if (!error.status) {
        // Backend server failed to respond. Something critical has gone wrong.
        error.status = 500;
      }

      return [error, null];
    }
  }
}
