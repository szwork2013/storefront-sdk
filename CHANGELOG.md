# 0.1.0

It's alive!! Now **storefront-react** and **storefront-flux** were merged into one, the one and only: **storefront-sdk**. So much love.. OK, let's go to the changes, shall we?

### Breaking Changes

Components are now registered in a store by calling an action. This makes the API slimmer and easier to grasp, since no new concepts were added, you are just using Flux. Also, this gives the flexibility to listen to changes on the ComponentStore.

Before:
```js
storefront.export('Example', Example);
```
Now:
```js
let component = {
  name: 'Example',
  constructor: Example
};

storefront.flux.actions.ComponentActions.register(component);
```

Before:
```js
let Example = storefront.import('Example');
```

Now:
```js
let Example = storefront.flux.stores.ComponentStore.getState().getIn(['Example', 'constructor']);
```

I know you are saying:

> :information_desk_person: The line is longer than it was before. How can you say the API is slimmer?  

In fact, it's longer, *but* **it's not a new abstraction** (must watch: [Sebastian Markbage: Minimal API Surface Area](https://www.youtube.com/watch?v=4anAwXYqLG8)), so you treat the new API as a flux action and store, which you already know how to handle.

Since now **ComponentStore** and **ComponentActions** takes care of the *Components*, the former ComponentStore is now called **SettingsStore** and **SettingsActions**, which makes more sense.

### Features

Our dear **connectToStores** annotation now lives inside the storefront object, so you can access it with : `storefront.connectToStores`.

```js
@storefront.connectToStores([
  storefront.flux.stores.CartStore
])
class MyReactComponent extends React.Component {
```

That's about it! See you next time!
