import flux from 'dispatcher/StorefrontDispatcher';
import CartActions from './actions.js';
import CartStore from './store.js';

flux.addActions('CartActions', CartActions);
flux.addStore('CartStore', CartStore);
