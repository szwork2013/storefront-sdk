# Criando uma store

Crie uma store, por exemplo:

> src/stores/MyCustomStore.js

```js
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { dispatcher } from 'sdk';

@immutable
class MyCustomStore {
  constructor(dispatcher) {
    // You can listen to actions here
    this.bindActions(dispatcher.actions.SearchActions);

    // Initial store state
    this.state = Immutable.fromJS({
      hello: 'world'
    });
  }

  // Handle actions
  onRequestSearchSuccess({ params, products }) {
    console.log(params, products);
  }
}

dispatcher.addStore('MyCustomStore', MyCustomStore, dispatcher);

export default dispatcher.stores.MyCustomStore;
```

Você precisa adicionar o [alt](bibliotecas.md) como dependência no seu `package.json` para usar o `ImmutableUtil`.

Você pode usar nos seus componentes React.

> src/components/AnyComponent.js

```js
import React from 'react';
import MyCustomStore from '../stores/MyCustomStore';

class AnyComponent extends React.Component {
  render() {
    let value = myCustomStore.getState().get('hello');

    return (
      <h1>Hello {value}</h1>
    );
  }
}

export default AnyComponent;
```

Para mais informações sobre stores do alt, leia a documentação oficial: [http://alt.js.org/guide/store/](http://alt.js.org/guide/store/)
