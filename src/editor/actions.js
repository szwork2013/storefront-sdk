import storefront from 'storefront';

class EditorActions {
  constructor() {
    this.generateActions('enterEditMode', 'exitEditMode');
  }
}

storefront.flux.addActions('EditorActions', EditorActions);
