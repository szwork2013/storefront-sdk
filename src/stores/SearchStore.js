import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { pluck } from 'lodash-compat/collection';

function getDataFromResources(state, resources) {
  let products = resources['products@vtex.storefront-sdk'];
  let product = resources['product@vtex.storefront-sdk'];

  let currentURL = (window.location.pathname + window.location.search);

  return state.withMutations(map => {
    for (let searchKey in products) {
      let results = Immutable.Map({ results: pluck(products[searchKey], 'slug') });
      map.set(currentURL, results);
    }
    for (let searchKey in product) {
      let results = Immutable.Map({ results: pluck(product[searchKey], 'slug') });
      map.set(currentURL, results);
    }
  });
}

@immutable
class SearchStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = getDataFromResources(Immutable.Map(), window.storefront.currentRoute.resources);
  }

  onRequestSearch(params) {
    let paramsMap = Immutable.Map(params);

    this.setState(this.state.set(params.$id, paramsMap));
  }

  onRequestSearchSuccess({ params, products }) {
    let search = this.state.get(params.$id);

    search.results = products.map( product => product.slug );

    this.setState(this.state.setIn([params.$id, 'results'], search.results));
  }

  onRequestSearchFail({ params, error }) {
    this.setState(this.state.setIn([params.$id, 'error'], error));
  }

  onRequestFacets(params) {
    this.setState(this.state.setIn([params.$id, 'facets'], params.facets));
  }

  onRequestFacetsSuccess({ params, facets }) {
    this.setState(this.state.setIn([params.$id, 'facets'], facets));
  }

  onRequestFacetsFail({ params, error }) {
    this.setState(this.state.setIn([params.$id, 'error'], error));
  }

  onGetRouteResourcesSuccess({resources}) {
    this.setState(getDataFromResources(this.state, resources));
  }
}

export default SearchStore;
