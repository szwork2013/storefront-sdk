import Search from 'services/Search';

class SearchActions {
  requestSearch(params) {
    // Call API with query parameter
    Search.products(params)
      .done((products) => {
        this.actions.requestSearchSuccess({ params, products });
      })
      .fail((error) =>
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
    let self = this;

    // Call API with query parameter
    Search.facets(params)
      .done((results) =>
        self.actions.requestFacetsSuccess({ params, results })
      )
      .fail((error) =>
        self.actions.requestFacetsFail({ params, error })
      );

    // we dispatch an event here so we can have a "loading" state
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
