import storefront from 'storefront';

class EditorActions {
  constructor() {
    this.generateActions('openAdmin', 'closeAdmin');
  }

  enterMode(mode) {
    return mode;
  }
}

storefront.flux.addActions('EditorActions', EditorActions);
