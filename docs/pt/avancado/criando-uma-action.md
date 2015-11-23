# Criando uma action

Crie uma action, por exemplo:

> src/actions/MyCustomActions

```js
import { dispatcher } from 'sdk';

class MyCustomActions {
  doSomething(value) {
    return value;
  }
}

dispatcher.addActions('MyCustomActions', MyCustomActions);

export default dispatcher.actions.MyCustomActions;
```

Você pode usar nos seus componentes React.

> src/components/AnyComponent.js

```js
import React from 'react';
import MyCustomActions from '../actions/MyCustomActions';

class AnyComponent extends React.Component {
  render() {
    MyCustomActions.doSomething('please');

    return (
      <h1>Hello</h1>
    );
  }
}

export default AnyComponent;
```

Para mais informações sobre actions do alt, leia a documentação oficial: [http://alt.js.org/guide/actions/](http://alt.js.org/guide/actions/)
