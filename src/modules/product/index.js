import flux from 'dispatcher/StorefrontDispatcher';
import ProductActions from './actions.js';
import ProductStore from './store.js';

flux.addActions('ProductActions', ProductActions);
flux.addStore('ProductStore', ProductStore);
