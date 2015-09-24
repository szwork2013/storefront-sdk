import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class ContextStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ContextActions);

    window._storefront.context.token = ('; ' + document.cookie).split('; VtexIdclientAutCookie=').pop().split(';').shift();

    this.state = Immutable.fromJS(window._storefront.context);
  }

  onChangeRoute(location) {
    let route = Immutable.fromJS(location);
    this.setState(this.state.set('route', route));
  }
}

export default ContextStore;
