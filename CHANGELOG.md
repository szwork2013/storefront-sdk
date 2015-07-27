# 0.2.0

We're going back home, Flux!

At this release we separated actions and stores into separate directories like most of the flux implementations do. This way, you will feel at home if you already know how to use Flux.

The StorefrontSDK instance now lives inside `window.storefront.sdk`, for two main reasons:
1. Storefront dump its data on the `window.storefront` variable and we don't want to brawl, do we? 
2. Let's be polite, people! Don't put all your stuff on the floor! All the new properties that we expose today forward, are inside `window.storefront.sdk`.

That means that `window.storefront.flux`, `window.storefront.connectToStores` and `window.storefront.init` are now inside `window.storefront.sdk`, except for `flux` that is now called `dispatcher` (you can access it with `window.storefront.sdk.dispatcher`).

Now, you can use the modules like this:

```js
import { connectToStores, dispatcher } from 'sdk';
```

Really nice, isn't it?

React, ReactRouter and ReactIntl are now integrated inside this module, so it's less files that you have to be concerned about on your `layout.html` file. This also makes the versions of this libraries the same across the universe (of storefront apps).

We added the [expose-loader](https://github.com/webpack/expose-loader) to expose the libraries to the global context, that is, no more `window.storefront` on our code.

Next steps: load react-intl and intl locale files depending on the locale of the store.

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
