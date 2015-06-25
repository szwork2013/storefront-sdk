import Constants from './LibConstants.js';
import _extend from 'lodash/object/extend';

const LOGISTICS_CONSTANTS = {
  BASE_LOGISTICS_URL: '/api/logistics/pub/',
  BASIC_AJAX: {
    type: 'GET',
    crossDomain: true,
    dataType: 'json'
  }
};

const CONSTANTS = _extend({}, Constants, LOGISTICS_CONSTANTS);

export default CONSTANTS;
