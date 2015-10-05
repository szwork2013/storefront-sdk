# Storefront SDK

This SDK provides routing, component registry, Flux dispatcher and VTEX common stores and actions for Storefront apps.

## How do I use it?

In you Storefront theme app add this app to your dependency:

```js
// meta.json
{
  "name": "my-app",
  ...
  "depedencies": {
    "vtex.storefront-sdk": "0.5.0"
  }
}
```

Add it as an external to your `webpack.config.js`:

```js
externals: {
  'sdk': 'storefront.sdk'
},
```

## Flux

Storefront SDK uses [Alt](http://alt.js.org/) as its Flux implementation, so it's simple and practical to create your own stores and actions.

All the stores offered by Storefront SDK are [Immutable](http://facebook.github.io/immutable-js/) objects, making the code safer.

You can import the stores and actions from the SDK:

```js
import { stores, actions } from 'sdk';
```

## Handling routes

#### 1. The React component

First, let's create an ordinary React component that will be rendered when the route **"/"** is opened. As you can see, this is an ordinary component, at this point the component doesn't handle the route.

```js
// src/pages/HomePage.js
import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <h1>Hello, world!</h1>
    );
  }
}

export default HomePage;
```

#### 2. The Storefront component definition

We need to declare that the **HomePage** component of this app will handle the route **"/"**, for this, create a JSON file at `storefront/components/` with the name of the component. In our example, that file will be named **HomePage.json**.

```json
// storefront/components/HomePage.json
{
  "route": {
    "name": "home",
    "path": "/"
  },
  "assets": [
    "commons.js",
    "HomePage.js"
  ]
}
```

Internally, the SDK uses [React Router](http://rackt.github.io/react-router/), so the property `path` should be a valid React Router parameter. The Storefront API and SDK get all the component page definitions from all the apps installed and generate the routing configuration on the run. If only your app it's installed, the code generated would be something like:

```js
<Route handler={App}>
  <Route path="/" component={HomePage} />;
</Route>
```

#### 3. The SDK component registry

To create the routing configuration, the SDK needs to get the components that handle the routes. We need a place to store all the public available components. For this purpose, those components should be registered at the **ComponentStore**.

The `ComponentActions.register` action is the function you will call to register them. This function accepts the following object or an array of the following object, if you are willing to register many components at the same time:

```js
let component = {
  "name": "<componentName>@<vendor>.<app>", // Unique identifier of the component with the suffix '@<vendor>.<app>'
  "constructor": Component, // Component constructor / class definition
  "role": "<roleName>" // [optional] Role name
};
```

```js
// src/pages/HomePage/index.js
import { actions } from 'sdk';
import HomePage from './HomePage';

let component = {
  name: 'HomePage@myvendorname.my-theme',
  constructor: HomePage
};

actions.ComponentActions.register(component);
```

Hooray! All set and good to go!


### Utilities

#### connectToStores

You may want your React components to listen to a change in a store. The SDK provides an utility called **connectToStores** that can be used for this purpose.

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
