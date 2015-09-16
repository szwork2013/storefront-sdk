import CartStore from './CartStore';
import ComponentStore from './ComponentStore';
import ContextStore from './ContextStore';
import EditorStore from './EditorStore';
import ProductStore from './ProductStore';
import SearchStore from './SearchStore';
import SettingsStore from './SettingsStore';
import ResourceStore from './ResourceStore';
import CategoryStore from './CategoryStore';
import FacetsStore from './FacetsStore';

let stores = [
  {name: 'CartStore', obj: CartStore},
  {name: 'ComponentStore', obj: ComponentStore},
  {name: 'ContextStore', obj: ContextStore},
  {name: 'EditorStore', obj: EditorStore},
  {name: 'ProductStore', obj: ProductStore},
  {name: 'SearchStore', obj: SearchStore},
  {name: 'SettingsStore', obj: SettingsStore},
  {name: 'ResourceStore', obj: ResourceStore},
  {name: 'CategoryStore', obj: CategoryStore},
  {name: 'FacetsStore', obj: FacetsStore}
];

export default stores;
