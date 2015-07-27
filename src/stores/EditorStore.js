import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class EditorStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.EditorActions);

    this.state = Immutable.fromJS({
      isActive: false,
      editor: null
    });
  }

  onSetActive(active) {
    this.setState(this.state.set('isActive', active));
  }

  onOpenEditor(editor) {
    this.setState(this.state.set('editor', Immutable.Map(editor)));
  }

  onCloseEditor() {
    let state = this.state.set('editor', null);
    this.setState(state.set('isActive', false));
  }
}

export default EditorStore;
