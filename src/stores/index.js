import CartStore from './CartStore';
import ComponentStore from './ComponentStore';
import EditorStore from './EditorStore';
import ProductStore from './ProductStore';
import SearchStore from './SearchStore';
import SettingsStore from './SettingsStore';
import ShopStore from './ShopStore';

let stores = [
  {name: 'CartStore', obj: CartStore},
  {name: 'ComponentStore', obj: ComponentStore},
  {name: 'EditorStore', obj: EditorStore},
  {name: 'ProductStore', obj: ProductStore},
  {name: 'SearchStore', obj: SearchStore},
  {name: 'SettingsStore', obj: SettingsStore},
  {name: 'ShopStore', obj: ShopStore}
];

export default stores;
