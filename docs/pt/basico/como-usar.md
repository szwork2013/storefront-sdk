# Como usar

Adicione o SDK como dependência de sua app:

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

Bibliotecas, como o React, serão adicionadas na página junto com o SDK. Você pode acessá-las da seguinte forma:

```js
var React = window.React;
var sdk = window.storefront.sdk;
```

## Melhorando a experiência de desenvolvimento

Coloque as [bibliotecas fornecidas pelo SDK](../avancado/bibliotecas.md) dentro de "externals" no seu `webpack.config.js`:

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

Isso permite que você escreva, por exemplo:
```js
import React from 'react';
import sdk from 'sdk';
```

## Próximo passo
[Como usar o Flux do SDK.](flux.md)
