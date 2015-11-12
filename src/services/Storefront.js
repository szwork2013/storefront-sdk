import axios from 'axios';
import { each } from 'lodash-compat/collection';

class Storefront {
  constructor() {
    let token = ('; ' + document.cookie).split('; VtexIdclientAutCookie=').pop().split(';').shift();
    let workspace = ('; ' + document.cookie).split('; vtex_workspace=').pop().split(';').shift();

    this.defaultHeaders = {
      'Authorization': `token ${token}`,
      'x-vtex-workspace': workspace ? workspace : 'master'
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

  getRouteResources(route, params, query) {
    each(query, function(value, key) {
      params[`query.${key}`] = value;
    });

    return axios.get(`/_routes/${route}/resources/`, {
      headers: this.defaultHeaders,
      params
    });
  }

  getRouteSettings(route) {
    return axios.get(`/_resources/_settings/?route=${route}`, {
      headers: this.defaultHeaders
    });
  }
}

export default Storefront;
