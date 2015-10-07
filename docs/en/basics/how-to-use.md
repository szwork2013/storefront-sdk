# How to use

In you Storefront app add this app to your dependency:

> meta.json

```js
{
  "name": "my-app",
  ...
  "depedencies": {
    "vtex.storefront-sdk": "0.5.0"
  }
}
```

Now you can access React and the SDK:

```js
var React = window.React;
var sdk = window.storefront.sdk;
```

To improve developer experience, add `React` and `storefront.sdk` as an external inside your `webpack.config.js`:

```js
externals: {
  'react': 'React',
  'sdk': 'storefront.sdk'
},
```

This allows you to write:
```js
import React from 'react';
import sdk from 'sdk';
```

## Next Steps
Now let's [create a new route](routes.md) in your app.
