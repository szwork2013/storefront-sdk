import storefront from 'storefront';
import Search from 'services/Search';

class ProductActions {
  requestProduct(params) {
    // Call API with query parameter
    Search.products(params)
    .done((product) =>
      this.actions.requestProductSuccess(product)
    )
    .fail((error) =>
      this.actions.requestProductFail(error)
    );

    return params.product;
  }

  requestProductSuccess(product) {
    return product;
  }

  requestProductFail(error) {
    return error;
  }

  selectVariation(variation) {
    return variation;
  }
}

storefront.flux.addActions('ProductActions', ProductActions);
