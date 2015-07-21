import storefront from 'storefront';
import Checkout from 'services/Checkout';
import _debounce from 'lodash/function/debounce';
import constants from 'services/constants.js';

let checkout = new Checkout();

class CartActions {
  requestCart() {
    this.dispatch();

    return checkout.getOrderForm()
      .done((orderForm) =>
        this.actions.requestSuccess(orderForm)
      )
      .fail((error) =>
        this.actions.requestFail(error)
      );
  }

  updateItems(orderFormId, items, expectedOrderFormSections = undefined, waitTime = 0) {
    this.dispatch();

    return (_debounce(() => {
      return checkout.updateItems(orderFormId, items, expectedOrderFormSections)
        .done((updatedOrderForm) =>
          this.actions.requestSuccess(updatedOrderForm)
        )
        .fail((error) =>
          this.actions.requestFail(error)
        );
    }, waitTime)());
  }

  removeItems(orderFormId, items, expectedOrderFormSections = undefined) {
    this.dispatch(items);

    return checkout.removeItems(orderFormId, items, expectedOrderFormSections)
      .done((updatedOrderForm) =>
        this.actions.requestSuccess(updatedOrderForm)
      )
      .fail((error) =>
        this.actions.requestFail(error)
      );
  }

  addToCart(orderFormId, items, expectedOrderFormSections = undefined) {
    this.dispatch();

    return checkout.addToCart(orderFormId, items, expectedOrderFormSections)
      .done((updatedOrderForm) =>
        this.actions.requestSuccess(updatedOrderForm)
      )
      .fail((error) =>
        this.actions.requestFail(error)
      );
  }

  addShippingData(orderFormId, shippingData, expectedOrderFormSections = undefined){
    this.dispatch();

    return checkout.sendAttachment(orderFormId, constants.SESSIONS.shippingData,
        shippingData, expectedOrderFormSections)
      .done((updatedShippingData) =>
        this.actions.requestSuccess(updatedShippingData)
      )
      .fail((error) =>
        this.actions.requestFail(error)
      );
  }

  requestSuccess(orderForm) {
    this.dispatch(orderForm);
  }

  requestFail(error) {
    this.dispatch(error);
  }
}

storefront.flux.addActions('CartActions', CartActions);
