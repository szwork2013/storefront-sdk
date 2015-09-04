import React from 'expose?React!react/addons';
import 'expose?ReactMount!react/lib/ReactMount';
import ReactRouter, { Route } from 'expose?ReactRouter!react-router';
import 'expose?Intl!intl';
import 'expose?Immutable!immutable';
import immutableStore from 'alt/utils/ImmutableUtil';
import 'expose?ReactIntl!react-intl';
import 'expose?axios!axios';
import _ from 'expose?lodash!lodash-compat';
import dispatcher from './dispatcher/StorefrontDispatcher';
import connectToStores from './utils/connectToStores.js';
import register from './utils/register.js';

let rootInstance;

class StorefrontSDK {
  dispatcher = dispatcher;
  actions = dispatcher.actions;
  stores = dispatcher.stores;

  register = register;
  connectToStores = connectToStores;
  immutableStore = immutableStore;

  createRouter() {
    let components = this.dispatcher.stores.ComponentStore.getState();

    let children = _.map(window.storefront.routes, (route, routeName) => {
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
    return ReactRouter.create({routes, location: ReactRouter.HistoryLocation});
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
    let locale = this.dispatcher.stores.ContextStore.getState().getIn(['culture', 'locale']);
    this.router.run((Handler, state) => {
      this.dispatcher.actions.ContextActions.changeRoute(state);
      rootInstance = React.render((
        <Handler messages={window.storefront.i18n} locales={locale}/>
      ), document.getElementById('storefront-container'));
    });
    this.enableHotLoad();
  }
}

let storefront = new StorefrontSDK();

export default storefront;
