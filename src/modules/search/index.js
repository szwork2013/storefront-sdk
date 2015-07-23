import flux from 'dispatcher/StorefrontDispatcher';
import SearchActions from './actions.js';
import SearchStore from './store.js';

flux.addActions('SearchActions', SearchActions);
flux.addStore('SearchStore', SearchStore);
