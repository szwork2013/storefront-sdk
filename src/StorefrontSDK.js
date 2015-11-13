import 'expose?ReactHelmet!react-helmet';

import { map } from 'lodash-compat/collection';
import { createHistory, useQueries } from 'history';
import { Router, Route } from 'react-router';
import ReactDOM from 'react-dom';

import dispatcher from './dispatcher/StorefrontDispatcher';
import storefront from './utils/storefront';
import connectToStores from './utils/connectToStores';
import ComponentNotFound from './utils/ComponentNotFound/';
import Price from './utils/Price';
import Img from './utils/Img';
import App from './App';

let history = useQueries(createHistory)();

class StorefrontSDK {
  dispatcher = dispatcher;
  actions = dispatcher.actions;
  stores = dispatcher.stores;

  storefront = storefront;
  history = history;

  utils = {
    connectToStores,
    Price,
    Img
  }

  init() {
    let components = this.dispatcher.stores.ComponentStore.getState();

    // Create routes based on the declared storefront components
    let children = map(window.storefront.routes, (route, routeName) => {
      let component = components.getIn([route.component, 'constructor']);

      let routeProps = {
        path: route.path,
        component: component,
        key: routeName
      };

      if (!component) {
        console.error(`Component ${route.component} not found.`);
        return <Route {...routeProps} component={ComponentNotFound(routeName, route.component)}/>;
      }

      if (component.onEnter) {
        routeProps.onEnter = component.onEnter;
      }
      if (component.onLeave) {
        routeProps.onLeave = component.onLeave;
      }

      return <Route {...routeProps}/>;
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
    ReactDOM.render(
      <Router history={this.history}>
        {wrapper}
      </Router>
    , document.getElementById('storefront-container'));
  }
}

let sdk = new StorefrontSDK();

export default sdk;
