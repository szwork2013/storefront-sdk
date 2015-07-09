import storefront from 'storefront';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class EditorStore {
  constructor() {
    this.bindActions(storefront.flux.actions.EditorActions);

    this.state = Immutable.fromJS({
      edit: false
    });
  }

  onEnterEditMode() {
    this.setState(this.state.set('edit', true));
  }

  onExitEditMode() {
    this.setState(this.state.set('edit', false));
  }
}

storefront.flux.addStore('EditorStore', EditorStore);
