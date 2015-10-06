# Routes

To create a new route, you need:
1. A React component to handle the route rendering
2. Declare this component in `storefront/components/`
3. Register the React component

### 1. The React component

First, let's create an ordinary React component that will be rendered when the route **"/"** is opened. As you can see, this is an ordinary component, at this point the component doesn't handle the route.

> src/pages/HomePage.js

```js
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

### 2. The Storefront component definition

Now we need to tell the servers to add the Javascript that contains the React component and that this component will handle a route.

We need to declare that the **HomePage** component of this app will handle the route **"/"**, for this, create a JSON file at `storefront/components/` with the name of the component. In our example, that file will be named **HomePage.json**.

> storefront/components/HomePage.json

```json
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

### 3. The SDK component registry

To create the routing configuration, the SDK needs to get the components that handle the routes. We need a place to store all the public available components. For this purpose, those components should be registered at the **ComponentStore**.

The `ComponentActions.register` action is the function you will call to register them. This function accepts the following object or an array of the following object, if you are willing to register many components at the same time:

```js
let component = {
  "name": "<componentName>@<vendor>.<app>", // Unique identifier of the component with the suffix '@<vendor>.<app>'
  "constructor": Component, // Component constructor / class definition
  "role": "<roleName>" // [optional] Role name
};
```

> src/pages/HomePage/index.js

```js
import { actions } from 'sdk';
import HomePage from './HomePage';

let component = {
  name: 'HomePage@myvendorname.my-theme',
  constructor: HomePage
};

actions.ComponentActions.register(component);
```

Hooray! All set and good to go!
