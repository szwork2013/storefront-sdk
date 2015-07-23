import React from 'react';
import map from 'lodash/collection/map';
import flux from 'dispatcher/StorefrontDispatcher';
import connectToStores from 'utils/connectToStores.js';
import { create, HistoryLocation, Route } from 'react-router';

let rootInstance;

class StorefrontSDK {
  connectToStores = connectToStores;
  flux = flux;

  createRouter() {
    let components = flux.stores.ComponentStore.getState();

    let children = map(window.storefront.routes, (route, routeName) => {
      let component = components.getIn([route.component, 'constructor']);
      return <Route name={routeName} key={routeName} path={route.path} handler={component} />;
    });

    let handler;
    if (components.get('AppEditor')) {
      handler = components.getIn(['AppEditor', 'constructor']);
    } else {
      handler = components.getIn(['App', 'constructor']);
    }

    let routes = (
      <Route handler={handler}>
        {children}
      </Route>
    );
    // TODO check browser support, degrade to hash
    return create({routes, location: HistoryLocation});
  }

  // Enable react hot loading with external React
  // see https://github.com/gaearon/react-hot-loader/tree/master/docs#usage-with-external-react
  enableHotLoad() {
    if (window.RootInstanceProvider) {
      window.RootInstanceProvider.injectProvider({
        getRootInstances() {
          return [rootInstance];
        }
      });
    }
  }

  init() {
    this.router = this.createRouter();
    this.router.run((Handler) =>
      rootInstance = React.render((
        <Handler messages={window.storefront.i18n}
          locales={window.storefront.ShopStore.locale}/>
      ), document.getElementById('storefront-container'))
    );
    this.enableHotLoad();
  }
}

window.storefront = new StorefrontSDK();

export default window.storefront;
