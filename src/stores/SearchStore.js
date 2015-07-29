import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class SearchStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);

    this.state = Immutable.Map();
  }

  onRequestSearch(params) {
    let paramsMap = Immutable.Map(params);
    this.setState(this.state.set(params.id, paramsMap));
  }

  onRequestSearchSuccess({ params, products }) {
    let search = this.state.get(params.id);

    search.results = products.map( product => product.slug );

    this.setState(this.state.setIn([params.id, 'results'], search.results));
  }

  onRequestSearchFail({ params, error }) {
    this.setState(this.state.setIn([params.id, 'error'], error));
  }

  onRequestFacets(params) {
    this.setState(this.state.setIn([params.id, 'facets'], params.facets));
  }

  onRequestFacetsSuccess({ params, facets }) {
    this.setState(this.state.setIn([params.id, 'facets'], facets));
  }

  onRequestFacetsFail({ params, error }) {
    this.setState(this.state.setIn([params.id, 'error'], error));
  }
}

export default SearchStore;
