# Storefront Core

React bindings and common stores and actions for Storefront apps.

## Usage

In your theme, include `storefront-core.js` before any other script.

This will provide new functionality under `window.storefront`.

## Flux

Storefront Core uses [Alt](http://alt.js.org/) as its Flux implementation, so it's simple and pratical to create your own stores and actions.

All the stores offered by Storefront Core are [Immutable](http://facebook.github.io/immutable-js/) objects, making the code safer.

The actions and stores are available under `storefront.flux.actions` and `storefront.flux.stores`, respectively.


### Components

You can register your components using the `ComponentActions`.

```js
// ProductPage.js
import React from 'react';
import storefront from 'storefront';

class ProductPage extends React.Component {
  ...
}

let component = {
  name: 'ProductPage@vtex.storefront-theme',
  constructor: ProductPage
}
storefront.flux.actions.ComponentActions.register(component);
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

So basically, Storefront Core will find the component to render like this:
```js
let ProductPage = storefront.flux.stores.ComponentStore.getState().get('ProductPage@vtex.storefront-theme');
```

In this example, If the user navigates to `/foo/p`, the `ProductPage` component will be rendered.
