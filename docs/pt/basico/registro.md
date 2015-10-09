# Registro

Umas das principais funções do SDK é manter o registro de componentes. Sua função é tornar componentes publicamente acessíveis por outras apps. Os dados são guardados em uma store chamada `ComponentStore`.

Para registrar um componente basta chamar a action `ComponentActions.register`. Essa action aceita o seguinte objeto (ou um array deste objeto):

```js
let component = {
  "name": "<componentName>@<vendor>.<app>",
  "constructor": Component // Component constructor / class definition
};
```

## Exemplo

### Registro em arquivo separado

> src/pages/ProductPage/index.js

```js
import { actions } from 'sdk';
import ProductPage from './ProductPage';

let component = {
  name: 'ProductPage@myvendorname.my-theme',
  constructor: ProductPage
};

actions.ComponentActions.register(component);
```

### Registro no arquivo do componente

> src/pages/ProductPage/ProductPage.js

```js
import React from 'react';
import { actions } from 'sdk';

class ProductPage extends React.Component {
  render() {
    return (
      <h1>Hello, world!</h1>
    );
  }
}

export default ProductPage;

actions.ComponentActions.register({
  name: 'ProductPage@myvendorname.my-theme',
  constructor: ProductPage
});
```

## Próximo passo
[Como rotear componentes.](roteamento.md)
