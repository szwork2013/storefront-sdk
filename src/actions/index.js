import CartActions from './CartActions';
import ComponentActions from './ComponentActions';
import EditorActions from './EditorActions';
import ProductActions from './ProductActions';
import SearchActions from './SearchActions';
import SettingsActions from './SettingsActions';

let actions = [
  {name: 'CartActions', obj: CartActions},
  {name: 'ComponentActions', obj: ComponentActions},
  {name: 'EditorActions', obj: EditorActions},
  {name: 'ProductActions', obj: ProductActions},
  {name: 'SearchActions', obj: SearchActions},
  {name: 'SettingsActions', obj: SettingsActions}
];

export default actions;
