# ContextStore

É um [Immutable.Map](http://facebook.github.io/immutable-js/docs/#/Map) no formato:

```js
{
  'accountName': 'dreamstore',
  'culture': {
    'countryCode': 'BR',
    'currency': 'BRL',
    'language': 'pt',
    'locale': 'pt-BR'
  },
  'route': {
    'location': {
      'action': 'POP',
      'hash': '',
      'key': 'jj6x0k',
      'pathname': '/camisa-polo/p',
      'query': {},
      'search': '',
      'state': null
    },
    'params': {
      'slug': 'camisa-polo'
    }
  },
  'token': '2vHsK86/GWNq',
  'user': {
    'isAdmin': true,
    'isCustomer': false,
    'isDeveloper': true
  }
}
```

- `accountName` (*String*): nome único da loja no sistema VTEX
- `culture` (*Object*): dados sobre a cultura da loja
  - `countryCode` (*String*): código do país
  - `currency` (*String*): código da moeda
  - `language` (*String*): língua
  - `locale` (*String*): locale ativo da loja
- `route` (*Object*): dados sobre a rota que está **ativa**
  - `location` (*Object*): objeto fornecido pelo ReactRouter/History ([veja documentação](https://github.com/rackt/history/blob/master/docs/Location.md))
  - `params` (*Object*): parâmetros da rota (ex: `/:slug/p`)
- `token` (*String*): valor do cookie de autenticação do VTEX ID
- `user` (*Object*): dados do usuário atual

### Actions relacionadas

- [`ContextActions.changeRoute`](../actions/ContextActions.md): altera a rota ativa

### Exemplo

```js
import React from 'react';
import { stores } from 'sdk';
import { FormattedNumber } from 'react-intl';

class Price extends React.Component {
  static defaultProps = {
    ContextStore: stores.ContextStore.getState()
  }

  render() {
    let currency = this.props.ContextStore.getIn(['culture' ,'currency']);

    return (
      <FormattedNumber style="currency" value={this.props.value} currency={currency} />
    );
  }
}

export default Price;
```
