/**
 *    @editable(dispatcher)
 *    class MyComponent extends React.Component {
 *      render() {
 *        ...
 *      }
 *    }
 */

import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { keys } from 'lodash-compat/object';
import dispatcher from '../dispatcher/StorefrontDispatcher';

function editable(metadata) {
  if (!metadata.title) {
    console.warn('Please define the property "title" for the component: ' + metadata.name);
  }

  return function decorator(Component) {
    class EditableComponent extends React.Component {
      static storefront = {
        title: metadata.title
      }

      state = {
        SettingsStore: dispatcher.stores.SettingsStore.getState(),
        EditorStore: dispatcher.stores.EditorStore.getState()
      }

      constructor(props) {
        super(props);

        dispatcher.stores.SettingsStore.listen(this.onChange);
        dispatcher.stores.EditorStore.listen(this.onChange);
      }

      componentWillUnmount = () => {
        dispatcher.stores.SettingsStore.unlisten(this.onChange);
        dispatcher.stores.EditorStore.unlisten(this.onChange);
      }

      onChange = () => {
        let settings = dispatcher.stores.SettingsStore.getState().getIn([this.props.route, this.props.id, 'settings']);
        let isEditing = dispatcher.stores.EditorStore.getState().get('isActive');

        this.setState({
          settings: settings,
          isEditing: isEditing
        });
      }

      shouldComponentUpdate = (nextProps, nextState) => {
        return shallowCompare(this, nextProps, nextState);
      }

      handleOpenEditor = () => {
        dispatcher.actions.EditorActions.openEditor({
          component: metadata.name,
          title: metadata.title,
          componentProps: this.props
        });
      }

      render() {
        const { settings, isEditing } = this.state;

        if (isEditing) {
          return (
            <div className="v-editor__component" onTouchTap={this.handleOpenEditor.bind(this)}>
              <span className="v-editor__component-name">{metadata.title}</span>
              <Component {...this.props} settings={settings}/>
            </div>
          );
        }

        return <Component {...this.props} settings={settings}/>;
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
