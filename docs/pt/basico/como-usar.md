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

Para melhorar a experiência de desenvolvimento, coloque o `React` e o `storefront.sdk` dentro de "externals" no seu `webpack.config.js`:

```js
externals: {
  'react': 'React',
  'sdk': 'storefront.sdk'
},
```

Isso permite que você escreva:
```js
import React from 'react';
import sdk from 'sdk';
```

> Veja a lista completa de [bibliotecas fornecidas pelo SDK](../avancado/bibliotecas.md)

## Próximo passo
Agora vamos [criar uma nova rota](../basico/rotas.md) no seu app.
