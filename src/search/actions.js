import storefront from 'storefront';
import Search from "services/Search";

class SearchActions {
  requestSearch(params) {
    this.dispatch(params);

    // Call API with query parameter
    Search.products(params)
      .done((products) => {
        this.actions.requestSearchSuccess({ params, products });
      })
      .fail((error) =>
        this.actions.requestSearchFail({ params, error })
      );
  }

  requestSearchSuccess(results) {
    this.dispatch(results);
  }

  requestSearchFail(error) {
    this.dispatch(error);
  }

  requestFacets(params) {
    let self = this;

    // we dispatch an event here so we can have a "loading" state
    this.dispatch(params);

    // Call API with query parameter
    Search.facets(params)
      .done((results) =>
        self.actions.requestFacetsSuccess({ params, results })
      )
      .fail((error) =>
        self.actions.requestFacetsFail({ params, error })
      );
  }

  requestFacetsSuccess(results) {
    this.dispatch(results);
  }

  requestFacetsFail(error) {
    this.dispatch(error);
  }
}

storefront.flux.createActions(SearchActions, 'SearchActions');
