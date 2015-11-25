import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import pluck from 'lodash-compat/collection/pluck';

function getDataFromResources(state, resources) {
  let path = window.location.pathname + window.location.search;
  let products = resources['products@vtex.storefront-sdk'];
  let product = resources['product@vtex.storefront-sdk'];

  return state.withMutations(map => {
    for (let componentId in products) {
      let productSlug = pluck(products[componentId], 'slug');
      let results = Immutable.Map().setIn([componentId, 'results'], productSlug);
      map.set(path, results);
    }
    for (let componentId in product) {
      let productSlug = pluck(product[componentId], 'slug');
      let results = Immutable.Map().setIn([componentId, 'results'], productSlug);
      map.set(path, results);
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
    if (!params.toJS) {
      return;
    }

    this.setState(this.state.set(params, Immutable.Map({'loading': true})));
  }

  onRequestSearchSuccess({ params, products }) {
    let state = this.state.setIn([params, 'results'], products.map( product => product.slug ));
    state = state.setIn([params, 'loading'], false);
    this.setState(state);
  }

  onRequestSearchFail({ params, error }) {
    let state = this.state.setIn([params, 'error'], error);
    state = state.setIn([params, 'loading'], false);
    this.setState(state);
  }

  onRequestFacets(params) {
    this.setState(this.state.setIn([params, 'facets'], params.facets));
  }

  onRequestFacetsSuccess({ params, facets }) {
    this.setState(this.state.setIn([params, 'facets'], facets));
  }

  onRequestFacetsFail({ params, error }) {
    this.setState(this.state.setIn([params, 'error'], error));
  }

  onGetAreaResourcesSuccess({resources}) {
    this.setState(getDataFromResources(this.state, resources));
  }
}

export default SearchStore;
