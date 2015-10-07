# Bibliotecas

Este documento lista todas as bibliotecas que o SDK provê e suas respectivas versões.

- [alt](https://github.com/goatslacker/alt) em v0.17.4, disponível em `window.alt`
- [axios](https://github.com/mzabriskie/axios) em v0.7.0, disponível em `window.axios`
- [history](https://github.com/rackt/history) em v1.12.0, instância disponível em `window.storefront.sdk.history`
- [Immutable](https://github.com/facebook/immutable-js) em v3.7.5, disponível em `window.Immutable`
- [Intl](https://github.com/andyearnshaw/Intl.js) em v1.0.0, disponível em `window.Intl`
- [React](https://github.com/facebook/react) em v0.14.0, disponível em `window.React`
- [ReactDOM](https://github.com/facebook/react) em v0.14.0, disponível em `window.ReactDOM`
- [React Intl](https://github.com/yahoo/react-intl) em v1.2.0, disponível em `window.ReactIntl`
- [React Router](https://github.com/rackt/react-router/) em v1.0.0-rc1, disponível em `window.ReactRouter`

Para o melhor uso delas, adicione ao seu `webpack.config.js`:

```js
externals: {
  'alt': 'alt',
  'axios': 'axios',
  'immutable': 'Immutable',
  'intl': 'Intl',
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-intl': 'ReactIntl',
  'react-router': 'ReactRouter',
  'sdk': 'storefront.sdk'
},
```

Isso permite que você possa importar elas no seu código, ex:
```js
import React from 'react';
```
