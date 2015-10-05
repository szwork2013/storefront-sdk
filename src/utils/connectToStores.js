/**
 *    @connectToStores([myStore])
 *    class MyComponent extends React.Component {
 *      render() {
 *        this.props.myStore // has myStore.state
 *      }
 *    }
 */

import React from 'react';
import { keys, assign } from 'lodash-compat/object';

const getStateFromStores = function (stores) {
  const state = {};
  stores.forEach((store) =>
    state[store.displayName] = store.getState()
  );
  return state;
};

function connectToStores(stores) {
  return function decorator(Component) {
    class StoreConnection extends React.Component {
      state = getStateFromStores(stores)

      constructor(props) {
        super(props);

        stores.forEach((store) => {
          store.listen(this.onChange);
        });
      }

      componentWillUnmount = () => {
        stores.forEach((store) => {
          store.unlisten(this.onChange);
        });
      }

      onChange = () => {
        this.setState(assign(this.state, getStateFromStores(stores)));
      }

      render() {
        return React.createElement(
          Component,
          assign({}, this.props, this.state)
        );
      }
    }

    let staticProperties = keys(Component);

    for (let i = 0; i < staticProperties.length; i++) {
      let property = staticProperties[i];
      StoreConnection[property] = Component[property];
    }

    return StoreConnection;
  };
}

export default connectToStores;
