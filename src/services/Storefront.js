import axios from 'axios';

class Storefront {
  constructor() {
    let token = ('; ' + document.cookie).split('; VtexIdclientAutCookie=').pop().split(';').shift();
    let workspace = ('; ' + document.cookie).split('; vtex_workspace=').pop().split(';').shift();
    let sandbox = ('; ' + document.cookie).split('; vtex_sandbox=').pop().split(';').shift();

    this.defaultHeaders = {
      'Accept': 'application/vnd.vtex.storefront.v0+json',
      'Authorization': `token ${token}`,
      'x-vtex-sandbox': sandbox,
      'x-vtex-workspace': workspace
    };
  }

  saveComponentSettings({route, id, component, settings}) {
    const url = `/_resources/_settings/`;
    const params = { route, id };
    const data = { component, settings };

    return axios.put(url, data, {
      headers: this.defaultHeaders,
      params
    });
  }

  getRouteResources(route, params) {
    return axios.get(`/_routes/${route}/resources/`, { params });
  }

  getRouteSettings(route) {
    return axios.get(`/_resources/_settings/?route=${route}`);
  }
}

export default Storefront;
