import 'expose?React!react/addons';
import 'expose?ReactRouter!react-router';
import 'expose?Intl!intl';
import 'expose?Immutable!immutable';
import 'expose?ReactIntl!react-intl';
import 'expose?axios!axios';
import 'expose?alt!alt';

import { map } from 'lodash-compat/collection';
import createHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';

import dispatcher from './dispatcher/StorefrontDispatcher';
import connectToStores from './utils/connectToStores';
import storefront from './utils/storefront';
import App from './App';

let React = window.React;
let { Router, Route } = window.ReactRouter;

let history = useQueries(createHistory)();

class StorefrontSDK {
  dispatcher = dispatcher;
  actions = dispatcher.actions;
  stores = dispatcher.stores;

  storefront = storefront;
  connectToStores = connectToStores;
  history = history;

  init() {
    // Listen to route changes
    this.history.listen((location) => {
      this.dispatcher.actions.ContextActions.changeRoute(location);
    });

    let components = this.dispatcher.stores.ComponentStore.getState();

    // Create routes based on the declared storefront components
    let children = map(window.storefront.routes, (route, routeName) => {
      let component = components.getIn([route.component, 'constructor']);
      return <Route path={route.path} component={component} key={routeName}/>;
    });

    let wrapper = (
      <Route component={App}>
        {children}
      </Route>
    );

    if (components.get('AppEditor')) {
      let AppEditor = components.getIn(['AppEditor', 'constructor']);
      wrapper = (
        <Route component={AppEditor}>
          {wrapper}
        </Route>
      );
    }

    // Finally, render
    React.render(
      <Router history={this.history}>
        {wrapper}
      </Router>
    , document.getElementById('storefront-container'));
  }
}

let sdk = new StorefrontSDK();

export default sdk;
