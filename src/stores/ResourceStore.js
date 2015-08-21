import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import hashRoute from 'utils/hashRoute';

@immutable
class ResourceStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ResourceActions);

    let resources = window.storefront.currentRoute.resources;
    let routeHash = hashRoute('home');

    this.state = Immutable.fromJS({[routeHash]: resources});

    this.exportPublicMethods({
      getResources: this.getResources
    });
  }

  getResources(route, params) {
    let routeHash = hashRoute(route, params);

    return this.state.get(routeHash);
  }

  onGetRouteResources({route, params}) {
    let routeHash = hashRoute(route, params);

    this.setState(this.state.set(routeHash, Immutable.Map()));
  }

  onGetRouteResourcesSuccess({route, params, resources}) {
    let routeHash = hashRoute(route, params);

    let newState = this.state.setIn([routeHash, 'resources'], resources);
    newState = newState.setIn([routeHash, 'error', null]);
    this.setState(newState);
  }

  onGetRouteResourcesError({ route, params, error }) {
    let routeHash = hashRoute(route, params);

    let newState = this.state.setIn([routeHash, 'resources'], null);
    newState = newState.setIn([routeHash, 'error', error]);
    this.setState(newState);
  }
}

export default ResourceStore;
