# Libraries

This document lists all the libraries that SDK provides and its versions.

- [alt](https://github.com/goatslacker/alt) at v0.17.4, available at `window.alt`
- [axios](https://github.com/mzabriskie/axios) at v0.7.0, available at `window.axios`
- [history](https://github.com/rackt/history) at v1.12.0, instance available at `window.storefront.sdk.history`
- [Immutable](https://github.com/facebook/immutable-js) at v3.7.5, available at `window.Immutable`
- [Intl](https://github.com/andyearnshaw/Intl.js) at v1.0.0, available at `window.Intl`
- [React](https://github.com/facebook/react) at v0.14.0-rc1, available at `window.React`
- [ReactDOM](https://github.com/facebook/react) at v0.14.0-rc1, available at `window.ReactDOM`
- [React Intl](https://github.com/yahoo/react-intl) at v1.2.0, available at `window.ReactIntl`
- [React Router](https://github.com/rackt/react-router/) at v1.0.0-rc1, available at `window.ReactRouter`

To make the best use of them, add to your `webpack.config.js`:

```js
externals: {
  'alt': 'alt',
  'axios': 'axios',
  'immutable': 'Immutable',
  'intl': 'Intl',
  'react': 'React',
  'react-intl': 'ReactIntl',
  'react-router': 'ReactRouter',
  'sdk': 'storefront.sdk'
},
```
