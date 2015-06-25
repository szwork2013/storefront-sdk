import Constants from './LibConstants.js';
import _extend from 'lodash/object/extend';

const CHECKOUT_CONSTANTS = {
  BASE_CHECKOUT_URL: '/api/checkout/pub/',
  COOKIE_NAME: 'checkout.vtex.com',
  COOKIE_ORDER_FORM_ID_KEY: '__ofid',
  ALL_ORDERFORM_SECTIONS: [
    'items',
    'totalizers',
    'clientProfileData',
    'shippingData',
    'paymentData',
    'sellers',
    'messages',
    'marketingData',
    'clientPreferencesData',
    'storePreferencesData',
    'giftRegistryData',
    'shippingData',
    'ratesAndBenefitsData',
    'openTextField'
  ],
  SESSIONS: {
    shippingData: 'shippingData'
  },
  BASIC_AJAX: {
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  }
};

const CONSTANTS = _extend({}, Constants, CHECKOUT_CONSTANTS);

export default CONSTANTS;
