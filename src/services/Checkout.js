import jQuery from 'jQuery';
import _extend from 'lodash/object/assign';
import _each from 'lodash/collection/each';
import Constants from './CheckoutConstants.js';

class Checkout {
  constructor(options) {
    this.HOST_URL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  _getSaveAttachmentURL(orderFormId, attachmentId) {
     return this._getBaseOrderFormURL(orderFormId) + '/attachments/' + attachmentId;
  }

  _getBaseOrderFormURL() {
    return this.HOST_URL + Constants.BASE_CHECKOUT_URL + 'orderForm';
  }

  _getOrderFormURL(orderFormId) {
    return this._getBaseOrderFormURL() + '/' + orderFormId;
  }

  _getUpdateItemURL(orderFormId) {
    return this._getOrderFormURL(orderFormId) + '/items/update';
  }

  _getAddToCartURL(orderFormId) {
    return this._getOrderFormURL(orderFormId) + '/items';
  }

  getOrderForm(expectedOrderFormSections = Constants.ALL_ORDERFORM_SECTIONS) {
    let checkoutRequest = { 'expectedOrderFormSections': expectedOrderFormSections };

    let props = {
      url: this._getBaseOrderFormURL(),
      data: JSON.stringify(checkoutRequest)
    };

    return jQuery.ajax(_extend({}, Constants.BASIC_AJAX, props));
  }

  updateItems(orderFormId, items, expectedOrderFormSections = Constants.ALL_ORDERFORM_SECTIONS) {
    let checkoutRequest = {
      orderItems: items,
      'expectedOrderFormSections': expectedOrderFormSections
    };

    let props = {
      url: this._getUpdateItemURL(orderFormId),
      data: JSON.stringify(checkoutRequest)
    };

    return jQuery.ajax(_extend({}, Constants.BASIC_AJAX, props));
  }

  removeItems(orderFormId, items, expectedOrderFormSections = Constants.ALL_ORDERFORM_SECTIONS) {
    _each(items, (item) => item.quantity = 0);
    return this.updateItems(orderFormId, items, expectedOrderFormSections);
  }

  sendAttachment(orderFormId, attachmentId, attachment, expectedOrderFormSections = Constants.ALL_ORDERFORM_SECTIONS) {
    let checkoutRequest = {
      [attachmentId]: attachment,
      'expectedOrderFormSections': expectedOrderFormSections
    };

    let props = {
      url: this._getSaveAttachmentURL(orderFormId, attachmentId),
      data: JSON.stringify(checkoutRequest)
    };

    return jQuery.ajax(_extend({}, Constants.BASIC_AJAX, props));
  }

  addToCart(orderFormId, items, expectedOrderFormSections = Constants.ALL_ORDERFORM_SECTIONS) {
    let checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: expectedOrderFormSections
    };

    let props = {
      url: this._getAddToCartURL(orderFormId),
      data: JSON.stringify(checkoutRequest)
    };

    return jQuery.ajax(_extend({}, Constants.BASIC_AJAX, props));
  }

}

export default Checkout;
