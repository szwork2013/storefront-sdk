import flux from 'dispatcher/StorefrontDispatcher';
import ComponentActions from './actions.js';
import ComponentStore from './store.js';

flux.addActions('ComponentActions', ComponentActions);
flux.addStore('ComponentStore', ComponentStore);
