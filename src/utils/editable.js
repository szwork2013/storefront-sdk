/**
 *    @editable(dispatcher)
 *    class MyComponent extends React.Component {
 *      render() {
 *        ...
 *      }
 *    }
 */

import React from 'react';
import { keys, assign } from 'lodash';

function editable(dispatcher) {
  return function decorator(Component) {
    class EditableComponent extends React.Component {
      state = {
        SettingsStore: dispatcher.stores.SettingsStore.getState(),
        ComponentStore: dispatcher.stores.ComponentStore.getState(),
        EditorStore: dispatcher.stores.EditorStore.getState()
      }

      constructor(props) {
        super(props);

        dispatcher.stores.SettingsStore.listen(this.onChange);
        dispatcher.stores.ComponentStore.listen(this.onChange);
        dispatcher.stores.EditorStore.listen(this.onChange);
      }

      componentWillUnmount = () => {
        dispatcher.stores.SettingsStore.unlisten(this.onChange);
        dispatcher.stores.ComponentStore.unlisten(this.onChange);
        dispatcher.stores.EditorStore.unlisten(this.onChange);
      }

      onChange = () => {
        this.setState({
          SettingsStore: dispatcher.stores.SettingsStore.getState(),
          ComponentStore: dispatcher.stores.ComponentStore.getState(),
          EditorStore: dispatcher.stores.EditorStore.getState()
        });
      }

      handleOpenEditor = () => {
        dispatcher.actions.EditorActions.openEditor({
          component: (Component.storefront.name + 'Editor'),
          route: this.props.route,
          id: this.props.id
        });
      }

      render() {
        const editMode = this.state.EditorStore.get('isActive');
        if (editMode) {
          return (
            <div className="v-editor__component" onTouchTap={this.handleOpenEditor.bind(this)}>
              <span className="v-editor__component-name">{Component.storefront.name}</span>
              <Component {...assign({}, this.props, this.state)}/>
            </div>
          );
        }

        return <Component {...assign({}, this.props, this.state)}/>;
      }
    }

    let staticProperties = keys(Component);

    for (let i = 0; i < staticProperties.length; i++) {
      let property = staticProperties[i];
      EditableComponent[property] = Component[property];
    }

    return EditableComponent;
  };
}

export default editable;
