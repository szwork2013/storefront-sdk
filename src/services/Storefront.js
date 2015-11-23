import axios from 'axios';

class Storefront {
  constructor() {
    let token = ('; ' + document.cookie).split('; VtexIdclientAutCookie=').pop().split(';').shift();
    let workspace = ('; ' + document.cookie).split('; vtex_workspace=').pop().split(';').shift();

    this.defaultHeaders = {
      'Authorization': `token ${token}`,
      'x-vtex-workspace': workspace ? workspace : 'master'
    };
  }

  saveComponentSettings({id, component, settings}) {
    const url = `/_resources/_settings/`;
    const params = { id };
    const data = { component, settings };

    return axios.put(url, data, {
      headers: this.defaultHeaders,
      params
    });
  }

  getRouteResources(route, params, query) {
    for (let key in query) {
      params[`query.${key}`] = query[key];
    }

    return axios.get(`/_routes/${route}/resources/`, {
      headers: this.defaultHeaders,
      params
    });
  }

  getComponentSettings(component) {
    return axios.get(`/_resources/_settings/?id=${component}`, {
      headers: this.defaultHeaders
    });
  }
}

export default Storefront;
