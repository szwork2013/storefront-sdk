import CartActions from './CartActions';
import ComponentActions from './ComponentActions';
import ContextActions from './ContextActions';
import EditorActions from './EditorActions';
import ProductActions from './ProductActions';
import ResourceActions from './ResourceActions';
import SearchActions from './SearchActions';

let actions = [
  {name: 'CartActions', obj: CartActions},
  {name: 'ComponentActions', obj: ComponentActions},
  {name: 'ContextActions', obj: ContextActions},
  {name: 'EditorActions', obj: EditorActions},
  {name: 'ProductActions', obj: ProductActions},
  {name: 'ResourceActions', obj: ResourceActions},
  {name: 'SearchActions', obj: SearchActions}
];

export default actions;
