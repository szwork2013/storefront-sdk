import storefront from 'storefront';
import Search from 'services/Search';

class ProductActions {
  requestProduct(params) {
    this.dispatch(params.product);

    // Call API with query parameter
    Search.products(params)
      .done((product) =>
        this.actions.requestProductSuccess(product)
      )
      .fail((error) =>
        this.actions.requestProductFail(error)
      );
  }

  requestProductSuccess(product) {
    this.dispatch(product);
  }

  requestProductFail(error) {
    this.dispatch(error);
  }

  selectVariation(variation) {
    this.dispatch(variation);
  }
}

storefront.flux.addActions('ProductActions', ProductActions);
