import StorefrontReact from './StorefrontReact'; // eslint-disable-line

import Cart from 'modules/cart'; // eslint-disable-line
import Component from 'modules/component'; // eslint-disable-line
import Editor from 'modules/editor'; // eslint-disable-line
import Product from 'modules/product'; // eslint-disable-line
import Search from 'modules/search'; // eslint-disable-line
import Settings from 'modules/settings'; // eslint-disable-line
import Shop from 'modules/shop'; // eslint-disable-line

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
