# SettingsStore

É um [Immutable.Map](http://facebook.github.io/immutable-js/docs/#/Map) no formato:

```js
{
  'product': {
    'skuSelector': {
      'color': '#fff000'
    }
  },
  'home': {
    'shelf1': {
      'category': 'masculina',
      'quantity': '3'
    },
    'shelf2': {
      'category': 'feminina',
      'quantity': '6'
    }
  }
}
```

- Nome da rota (*String*)
  - Id do componente (*String*)
    - Objeto definido pelo editor (*Object*): configurações do componente

### Actions relacionadas

- [`ResourceActions.getAreaResources`](../actions/ResourceActions.md): pega os resources da página

### Exemplo

```js
import React from 'react';
import { stores } from 'sdk';

class Banner extends React.Component {
  constructor(props) {
    super(props);

    let settingsStore = stores.SettingsStore.getState();
    this.state {
      settings: settingsStore.getIn([props.route, props.id])
    };
  }

  render() {
    if (!this.state.settings) {
      return (
        <div>
          <img src="http://placehold.it/350x150"/>
        </div>
      );
    }

    return (
      <div>
        <img src={this.state.settings.img}/>
      </div>
    );
  }
}

export default Banner;
```
