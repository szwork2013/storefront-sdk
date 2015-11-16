# ComponentStore

It is an [Immutable.Map](http://facebook.github.io/immutable-js/docs/#/Map) in the format:

```js
{
  'HomePage@vtex.storefront-theme': {
    'constructor': HomePage
  },
  'Banner@vtex.storefront-theme': {
    'constructor': Banner
  }
}
```

- Name of the component (*String*): name of the registered component (`<nome>@<vendor>.<app>`)
  - `constructor` (*Object*): React component

### Related actions

- [`ComponentActions.register`](../actions/ComponentActions.md): register the components in this store

### Example

```js
import { stores } from 'sdk';

class Foo extends React.Component {
  defaultProps = {
    componentStore: stores.ComponentStore.getState()
  }

  render() {
    let PageComponent = componentStore.getIn([
      'HomePage@vtex.storefront-theme',
      'constructor'
    ]);

    return (
      <PageComponent/>
    )
  }
}

export default Foo;
```
