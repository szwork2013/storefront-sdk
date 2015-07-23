import jQuery from 'jQuery';
import _extend from 'lodash/object/assign';
import StorefrontConstants from 'constants/StorefrontConstants';

class Storefront {
  constructor() {
    let token = ('; ' + document.cookie).split('; VtexIdclientAutCookie=').pop().split(';').shift();

    this.defaultAjax = {
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {
        'Accept': 'application/vnd.vtex.storefront.v0+json',
        'Authorization': `token ${token}`
      }
    };
  }

  saveComponentSettings({accountName, route, component, id, settings}) {
    const url = `${StorefrontConstants.BASE_URL}${accountName}/storefront/components/${route}/${id}`;

    const data = {
      'component': component,
      'settings': settings
    };

    let props = {
      url: url,
      method: 'PUT',
      data: JSON.stringify(data)
    };

    return jQuery.ajax(_extend({}, this.defaultAjax, props));
  }

}

export default Storefront;
