import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import EditorActions from './actions';

@immutable
class EditorStore {
  constructor() {
    this.bindActions(EditorActions);

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
