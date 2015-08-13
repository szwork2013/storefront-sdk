import sdk from 'expose?storefront.sdk!./StorefrontSDK';
import injectTapEventPlugin from 'react-tap-event-plugin';
import actions from './actions';
import stores from './stores';
import map from 'lodash/collection/map';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Register all actions and stores
map(actions, (action) => sdk.dispatcher.addActions(action.name, action.obj));
map(stores, (store) => sdk.dispatcher.addStore(store.name, store.obj, sdk.dispatcher));
