import storefront from 'storefront';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class EditorStore {
  constructor() {
    this.bindActions(storefront.flux.actions.EditorActions);

    this.state = Immutable.fromJS({
      edit: false,
      admin: null
    });
  }

  onEnterEditMode() {
    this.setState(this.state.set('edit', true));
  }

  onExitEditMode() {
    this.setState(this.state.merge({ edit: false, admin: null }));
  }

  onOpenAdmin(adminComponentName) {
    this.setState(this.state.set('admin', adminComponentName));
  }

  onCloseAdmin() {
    this.setState(this.state.set('admin', null));
  }
}

storefront.flux.addStore('EditorStore', EditorStore);
