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
    "vtex.storefront-sdk": "0.1.0"
  },
  "schema": {
    "storefront": 1
  }
}
```

And add the main script to your `layout.html` and, after all is done, init the SDK:

```html
<!-- layout.html -->
<!doctype html>
<html lang="{{ culture.code }}">
<head>
  <meta charset="UTF-8">
  <title>{{ account.name }}</title>
  {% dump styles %}
</head>
<body>
  <div id="storefront-container"></div>

  {% script 'storefront-sdk.js@vtex.storefront-sdk' %}

  {% capture intlLocaleUrl %}//io.vtex.com.br/front-libs/intl/0.1.4/locale-data/jsonp/{{ culture.language | split: "-" | first }}.js{% endcapture %}
  {% script intlLocaleUrl %}
  {% capture reactLocaleUrl %}//io.vtex.com.br/front-libs/react-intl/1.2.0/locale-data/{{ culture.language | split: "-" | first }}.js{% endcapture %}
  {% script reactLocaleUrl %}

  {% dump scripts %}

  <script>
    window.storefront.sdk.init(); // BOOM!
  </script>

  <script src="http://localhost:35729/livereload.js?snipver=1"></script>
</body>
</html>
```

## React components

### App component

The App component is the root element of the application, this component can only be defined by the theme app (by theme app, we mean, the only Storefront app that has a `storefront/layout.html` file).

```js
// src/components/App.jsx
import React from 'react';
import { RouteHandler } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <RouteHandler/>
    )
  }
}

export default App;
```

At the most cases this component will be simple as that. So why doesn't the SDK take care of it? Giving you the control of it will give you enough flexibility to go crazy or advanced stuff.

The active page component will be rendered at `<RouteHandler/>`.

### Page component

#### 1. The React component

The second most important component is a page component. A page component is a component that handles a route, for example, a component called **HomePage** that will handle the route **"/"**.

First, let's create an ordinary React component that will be rendered when the route **"/"** is opened. As you can see, this is an ordinary component, at this point it's not a page component.

```js
// src/pages/HomePage.jsx
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

To make it a page component, we need to declare that the **HomePage** component of this app will handle the route **"/"**. We need to create a JSON file at `storefront/components/` with the name of the component, in our example, that file will be named **HomePage.json**.

```json
// storefront/components/HomePage.json
{
  "route": {
    "name": "home",
    "path": "/"
  },
  "assets": [
    "my-theme-bundle.js"
  ]
}
```

Internally, the SDK uses [React Router](http://rackt.github.io/react-router/), so the properties `name` and `path` should be valid React Router parameters. The Storefront API and SDK get all the component page definitions from all the apps installed and generate the React Route code on the run. If only your app it's installed, the code generated would be something like:

```js
<Route handler={App}>
  <Route name="home" key="home" path="/" handler={HomePage} />;
</Route>
```

We also need to specify which assets is needed for this component in the **assets** property. In this case, we compiled all the app into a bundled and minified file called **my-theme-bundle.js**, so we just referenced it.

#### 3. The SDK component registry

To create the router, the SDK needs to get the page components. We need a place to store all the public available components. For this purpose, those components should be registered at the **ComponentStore**.

The `ComponentActions.register` action is the function you will call to register them. This function accepts the following object or an array of the following object, if you are willing to register many components at the same time:

```js
let component = {
  "name": "<componentName>@<vendor>.<app>", // Unique identifier of the component with the suffix '@<vendor>.<app>'
  "constructor": Component, // Component constructor / class definition
  "area": "<areaName>", // [optional] Area name
  "role": "<roleName>" // [optional] Role name
};
```

```js
// src/index.js
import { dispatcher } from 'sdk';
import HomePage from 'pages/HomePage';

let component = {
  name: 'HomePage@myvendorname.my-theme',
  constructor: HomePage
};

dispatcher.actions.ComponentActions.register(component);
```

Hooray! All set and good to go!

### Flux stores and actions

You may want your React components to listen to a change in a store. The SDK provides an utility called **connectToStores** that can be used for this purpose.

```js
import React from 'react';
import { connectToStores, dispatcher } from 'sdk';

@connectToStores([
  dispatcher.stores.ComponentStore
])
class Hello extends React.Component {
  render() {
    let components = this.props.ComponentStore
    return <h1>Hello, world</h1>
  }
}
```


## Flux

Storefront SDK uses [Alt](http://alt.js.org/) as its Flux implementation, so it's simple and practical to create your own stores and actions.

All the stores offered by Storefront SDK are [Immutable](http://facebook.github.io/immutable-js/) objects, making the code safer.

The actions and stores are available under `window.storefront.sdk.dispatcher.actions` and `window.storefront.sdk.dispatcher.stores`, respectively.
