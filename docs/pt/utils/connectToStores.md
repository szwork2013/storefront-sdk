# connectToStores

Esse decorator ajuda seus componentes React a escutarem mudanças em uma ou mais stores.

Example:
```js
import React from 'react';
import { stores, utils } from 'sdk';

@utils.connectToStores()
class MyComponent extends React.Component {
  static getStores(props) {
    return [stores.ProductStore]
  }

  static getPropsFromStores(props) {
    return {
      product: stores.ProductStore.getState().get(props.params.slug)
    };
  }

  render() {
    // Use this.props.product as you like...
  }
}
```
