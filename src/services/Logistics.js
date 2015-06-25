import jQuery from 'jQuery';
import _extend from 'lodash/object/assign';
import Constants from '../constants/LogisticsConstants.js';

class Logistics {

  constructor(options) {
    this.HOST_URL = "http://logistics.vtexcommercebeta.com.br";
  }
  _getBaseLogisticsURL() {
    return this.HOST_URL + Constants.BASE_LOGISTICS_URL;
  }

  _getBaseDeliveryPointURL() {
    return this._getBaseLogisticsURL() + 'configuration/deliverypoint/';
  }

  _getDeliveryPointURL(account, deliveryPointId) {
    return this._getBaseDeliveryPointURL() + deliveryPointId + '?an=' + account;
  }

  getDeliveryPoint(account, deliveryPointId) {
    let props = {
      url: this._getDeliveryPointURL(account, deliveryPointId)
    };

    return jQuery.ajax(_extend({}, Constants.BASIC_AJAX, props));
  }

  listDeliveryPoints(account) {
    let props = {
      url: this._getBaseDeliveryPointURL(account)
    };

    return jQuery.ajax(_extend({}, Constants.BASIC_AJAX, props));
  }
}

export default Logistics;
