# Storefront SDK

React routing, component registry, Flux and VTEX common stores and actions for Storefront apps.

## Usage

In your theme, include `storefront-sdk.js` before any other script.

This will provide new functionality under `window.storefront.sdk`.

## Flux

Storefront SDK uses [Alt](http://alt.js.org/) as its Flux implementation, so it's simple and practical to create your own stores and actions.

All the stores offered by Storefront SDK are [Immutable](http://facebook.github.io/immutable-js/) objects, making the code safer.

The actions and stores are available under `window.storefront.sdk.dispatcher.actions` and `window.storefront.sdk.dispatcher.stores`, respectively.


### Components

You can register your components using the `ComponentActions`.

```js
// ProductPage.js
import React from 'react';
import { dispatcher } from 'sdk';

class ProductPage extends React.Component {
  ...
}

let component = {
  name: 'ProductPage@vtex.storefront-theme',
  constructor: ProductPage
}
dispatcher.actions.ComponentActions.register(component);
```

All the components will be available at the `ComponentStore`.

### Routing

Routes are based on Storefront **components**, which are defined in `storefront/components/`.

To bind a route to a component you **must** have a corresponding React component to render it.

```json
// ProductPage.json
{
  "route": {
    "name": "product",
    "path": "/:product/p"
  }
}
```

When Storefront starts, the routes will be matched based on the **component name**, having the following structure: `<filename>@<owner.app>`.

So basically, Storefront SDK will find the component to render like this:
```js
let ProductPage = dispatcher.stores.ComponentStore.getState().get('ProductPage@vtex.storefront-theme');
```

In this example, If the user navigates to `/foo/p`, the `ProductPage` component will be rendered.


### Addons

You may want to use [connectToStores](./src/utils/connectToStores.js) to connect you React components to the changes made in the store. `connectToStores` is a high order component that can be used as an annotation in you React components:

```js
import React from 'react';
import { dispatcher, connectToStores } from 'sdk';

@connectToStores([
  dispatcher.stores.ShopStore
])
class ProductPage extends React.Component {
  ...
}

export default ProductPage;
```

In this example, the Store state will be available at `this.props.ShopStore`.
