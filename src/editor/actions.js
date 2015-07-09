import storefront from 'storefront';

class EditorActions {
  constructor() {
    this.generateActions('enterEditMode', 'exitEditMode',
      'openAdmin', 'closeAdmin');
  }
}

storefront.flux.addActions('EditorActions', EditorActions);
