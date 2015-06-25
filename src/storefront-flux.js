import storefront from 'storefront';

// Actions
import CartActions from './actions/CartActions';
import ProductActions from './actions/ProductActions';
import SearchActions from './actions/SearchActions';
import ShopActions from './actions/ShopActions';

// Stores
import CartStore from './stores/CartStore';
import ProductStore from './stores/ProductStore';
import SearchStore from './stores/SearchStore';
import ShopStore from './stores/ShopStore';

storefront.exportActions('CartActions', CartActions);
storefront.exportActions('ProductActions', ProductActions);
storefront.exportActions('SearchActions', SearchActions);
storefront.exportActions('ShopActions', ShopActions);

storefront.exportStore('CartStore', CartStore);
storefront.exportStore('ProductStore', ProductStore);
storefront.exportStore('SearchStore', SearchStore);
storefront.exportStore('ShopStore', ShopStore);
