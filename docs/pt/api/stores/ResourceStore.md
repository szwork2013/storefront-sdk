# ResourceStore

É um [Immutable.Map](http://facebook.github.io/immutable-js/docs/#/Map) no formato:

```js
{
  '/': {
    'error': null,
    'resources': [
      '_settings':
    ]
  },
  '/camisa-polo/p': {
    'error': null,
    'resources': [
      'product@vtex.storefront-sdk',
      '_settings':
    ]
  }
}
```

- Path da URL (*String*)
  - `error` (*String*): caso dê erro ao requisitar resources desse path, essa propriedade virá preenchida
  - `resources` (*Array*): lista dos nomes dos recursos da página

### Actions relacionadas

- [`ResourceActions.getRouteResources`](../actions/ResourceActions.md): pega os resources da página

### Exemplo

```js
import React from 'react';
import { stores, actions } from 'sdk';

class HomePage extends React.Component {
  componentWillMount() {
    let currentURL = (window.location.pathname + window.location.search);

    if (!stores.ResourceStore.getState().get(currentURL)) {
      actions.ResourceActions.getRouteResources(currentURL, 'home');
    }
  }

  render() {
    return (
      <div>
        Hello world!
      </div>
    );
  }
}

export default HomePage;
```
