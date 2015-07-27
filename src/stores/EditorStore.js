import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class EditorStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.EditorActions);

    this.state = Immutable.fromJS({
      activeMode: 'preview',
      admin: null
    });
  }

  onEnterMode(mode) {
    this.setState(this.state.set('activeMode', mode));
  }

  onOpenAdmin(admin) {
    this.setState(this.state.set('admin', Immutable.Map(admin)));
  }

  onCloseAdmin() {
    let state = this.state.set('admin', null);
    this.setState(state.set('activeMode', 'preview'));
  }
}

export default EditorStore;
