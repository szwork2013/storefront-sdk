import Search from 'services/Search';

class SearchActions {
  requestSearch(params) {
    // Call API with query parameter
    Search.products(params)
      .then((result) => {
        let products;
        if (result.data['product@vtex.storefront-sdk']) {
          products = result.data['product@vtex.storefront-sdk']._page;
        } else if (result.data['products@vtex.storefront-sdk']) {
          products = result.data['products@vtex.storefront-sdk']._page;
        }
        this.actions.requestSearchSuccess({ params, products });
      })
      .catch((error) =>
        this.actions.requestSearchFail({ params, error })
      );

    return params;
  }

  requestSearchSuccess(results) {
    return results;
  }

  requestSearchFail(error) {
    return error;
  }

  requestFacets(params) {
    // Call API with query parameter
    Search.facets(params)
      .then((result) => {
        const results = result.data;
        this.actions.requestFacetsSuccess({ params, results });
      })
      .catch((error) =>
        this.actions.requestFacetsFail({ params, error })
      );

    return params;
  }

  requestFacetsSuccess(results) {
    return results;
  }

  requestFacetsFail(error) {
    return error;
  }
}

export default SearchActions;
