import StorefrontConstants from 'constants/StorefrontConstants';
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

  saveComponentSettings({accountName, route, component, id, settings}) {
    const url = `${StorefrontConstants.BASE_URL}${accountName}/storefront/components/${route}/${id}`;
    const data = {
      'component': component,
      'settings': settings
    };

    return axios({
      method: 'PUT',
      url: url,
      headers: this.defaultHeaders,
      data: data
    });
  }

}

export default Storefront;
