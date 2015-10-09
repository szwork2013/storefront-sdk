# Flux

O SDK tem como princípio ser o ponto comum entre as apps. Por conta disso, ele conta com a instância do dispatcher do [Flux](http://facebook.github.io/flux/docs/overview.html#content).

Você pode acessar o dispatcher da seguinte maneira:

```js
import { dispatcher } from 'sdk';
```

> Caso não use as configurações do `webpack.config.js` sugeridas em [Como usar](como-usar.md), use `window.storefront.sdk.dispatcher`

## Alt

O SDK usa o [Alt](http://alt.js.org/) como sua implementação de Flux, então é fácil criar suas próprias stores e actions. Leia na documentação do Alt como fazer isso:

- [Criando stores no Alt](http://alt.js.org/guide/store/)
- [Criando actions no Alt](http://alt.js.org/guide/actions/)

## Immutable

Todas as stores oferecidas pelo SDK são compostas por objetos [Immutable](http://facebook.github.io/immutable-js/). Isso faz com que [melhore a performance da aplicação](https://facebook.github.io/react/docs/advanced-performance.html#immutable-js-and-flux), além de evitar que uma app não cause um mal comportamento em toda a aplicação.

## Stores e actions

Para acessar as stores e actions registradas no dispatcher, use uma das formas abaixo.

Através do dispatcher:
```js
import { dispatcher } from 'sdk';

let stores = dispatcher.stores;
let actions = dispatcher.actions;
```

Através do alias:
```js
import { stores, actions } from 'sdk';
```

## Próximo passo
[Registrando componentes publicamente.](registro.md)
