# ContextStore

It is an [Immutable.Map](http://facebook.github.io/immutable-js/docs/#/Map) in the format:

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

- `accountName` (*String*): unique name of the store in VTEX
- `culture` (*Object*): data about the store's culture
  - `countryCode` (*String*): country code
  - `currency` (*String*): currency code
  - `language` (*String*): language
  - `locale` (*String*): active store's locale
- `route` (*Object*): data about the **current** route
  - `location` (*Object*): object provided by the React Router and History ([see their docs](https://github.com/rackt/history/blob/master/docs/Location.md))
  - `params` (*Object*): route parameters (ex: `/:slug/p`)
- `token` (*String*): VTEX ID auth cookie value

### Related actions

- [`ContextActions.changeRoute`](../actions/ContextActions.md): notify the store about the route change

### Example

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
