# Rotas

Para criar uma nova rota, você precisa:
1. Um componente React responsável pela renderização da página
2. Definir o componente e a rota em `storefront/components/`
3. Registrar o componente React no SDK

### 1. O componente React

Vamos criar um componente React normal que será renderizado quando a nova rota é aberta.

> src/pages/ProductPage.js

```js
import React from 'react';

class ProductPage extends React.Component {
  render() {
    return (
      <h1>Hello, world!</h1>
    );
  }
}

export default ProductPage;
```

### 2. Definição do componente

Precisamos informar ao servidor para que ele responda a rota **"/"** com o componente React criado no item 1. Além disso, ele deve saber quais arquivos devem ser inseridos para que esse componente possa ser renderizado.

A forma de nos comunicarmos com o servidor se dá pelos arquivos na pasta `storefront/`. Crie um arquivo de definição de componente no seguinte modelo:

> storefront/components/ProductPage.json

```json
{
  "route": {
    "name": "product",
    "path": "/product"
  },
  "assets": [
    "commons.js",
    "ProductPage.js"
  ]
}
```

O nome do arquivo deve ser o nome do componente React, por isso, demos o nome de "ProductPage.json".

O JSON contém informações sobre a rota e os assets (arquivos estáticos que ficam dentro da pasta `storefront/assets/`) necessários para renderizar o componente.

Internamente, o SDK usa o [React Router](http://rackt.github.io/react-router/), logo, a propriedade `path` deve ser um parâmetro válido para o React Router. Os servidores do Storefront e o SDK pegam todas as definições de componentes das apps instaladas e geram a configuração de roteamento automaticamente para que você não tenha que se preocupar com isso.

### 3. Registro do componente no SDK

O SDK precisa conseguir acessar o construtor de seu componente React para que ele possa renderiza-lo quando a rota **"/"** (definida no arquivo do passo 2) for aberta. Para isso, armazenaremos os construtores dos componentes na store **ComponentStore**.

Você irá chamar a action `ComponentActions.register` para registrar o seu componente. Essa action aceita o seguinte objeto (ou um array deste objeto):

```js
let component = {
  "name": "<componentName>@<vendor>.<app>", // Unique identifier of the component with the suffix '@<vendor>.<app>'
  "constructor": Component, // Component constructor / class definition
  "role": "<roleName>" // [optional] Role name
};
```

Para registrar, importe as actions do SDK e chame a action com o objeto especificado.

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

Uhuul! Tudo pronto agora!

## Próximo passo
Iremos agora aprender a [pegar dados da API com o Flux](dados-e-flux.md).
