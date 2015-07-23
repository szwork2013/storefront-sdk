import flux from 'dispatcher/StorefrontDispatcher';
import SettingsActions from './actions.js';
import SettingsStore from './store.js';

flux.addActions('SettingsActions', SettingsActions);
flux.addStore('SettingsStore', SettingsStore);
