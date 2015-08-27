import CartStore from './CartStore';
import ComponentStore from './ComponentStore';
import ContextStore from './ContextStore';
import EditorStore from './EditorStore';
import ProductStore from './ProductStore';
import SearchStore from './SearchStore';
import SettingsStore from './SettingsStore';
import ResourceStore from './ResourceStore';

let stores = [
  {name: 'CartStore', obj: CartStore},
  {name: 'ComponentStore', obj: ComponentStore},
  {name: 'ContextStore', obj: ContextStore},
  {name: 'EditorStore', obj: EditorStore},
  {name: 'ProductStore', obj: ProductStore},
  {name: 'SearchStore', obj: SearchStore},
  {name: 'SettingsStore', obj: SettingsStore},
  {name: 'ResourceStore', obj: ResourceStore}
];

export default stores;
