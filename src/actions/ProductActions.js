import Search from 'services/Search';

class ProductActions {
  requestProduct(params) {
    // Call API with query parameter
    Search.products(params)
    .then((result) =>
      this.actions.requestProductSuccess(result.data)
    )
    .catch((error) =>
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

export default ProductActions;
