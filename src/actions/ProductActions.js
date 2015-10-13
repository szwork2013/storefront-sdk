import Search from 'services/Search';

const search = new Search();

class ProductActions {
  requestProduct(params) {
    // Call API with query parameter
    search.products(params)
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
