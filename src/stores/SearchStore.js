import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { pluck } from 'lodash';

let bootstrap = function bootstrap() {
  let products = window.storefront.currentRoute.resources['products@vtex.storefront-sdk'];
  let product = window.storefront.currentRoute.resources['product@vtex.storefront-sdk'];

  let bootstrapData = Immutable.Map();

  bootstrapData = bootstrapData.withMutations(map => {
    for (let searchKey in products) {
      let results = Immutable.Map({ results: pluck(products[searchKey], 'slug') });
      map.set(searchKey, results);
    }
    for (let searchKey in product) {
      let results = Immutable.Map({ results: pluck(product[searchKey], 'slug') });
      map.set(searchKey, results);
    }
  });

  return bootstrapData;
};

@immutable
class SearchStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);

    this.state = bootstrap();
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
}

export default SearchStore;
