import flux from 'dispatcher/StorefrontDispatcher';
import EditorActions from './actions.js';
import EditorStore from './store.js';

flux.addActions('EditorActions', EditorActions);
flux.addStore('EditorStore', EditorStore);
