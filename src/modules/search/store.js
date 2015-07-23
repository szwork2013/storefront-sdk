import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import SearchActions from './actions';

@immutable
class SearchStore {
  constructor() {
    this.bindActions(SearchActions);

    this.state = Immutable.Map();
  }

  onRequestSearch(params) {
    this.setState(this.state.set(params.id, params));
  }

  onRequestSearchSuccess({ params, products }) {
    let search = this.state.get(params.id);

    search.results = products.map( product => product.slug );

    this.setState(this.state.set(params.id, search));
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
