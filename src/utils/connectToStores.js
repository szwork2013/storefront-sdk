/**
 *    @connectToStores([myStore])
 *    class MyComponent extends React.Component {
 *      render() {
 *        this.props.myStore // has myStore.state
 *      }
 *    }
 */

import React from 'react';
import { keys, assign } from 'lodash';

const getStateFromStores = function (stores) {
  const state = {};
  stores.forEach((store) =>
    state[store.displayName] = store.getState()
  );
  return state;
};

function connectToStores(stores) {
  return function decorator(Component) {
    let storefrontProps = Component.storefront;

    if (storefrontProps && !storefrontProps.name) {
      storefrontProps.name = Component.name;
    }

    class StoreConnection extends React.Component {
      static storefront = storefrontProps

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

    return StoreConnection;
  };
}

export default connectToStores;
