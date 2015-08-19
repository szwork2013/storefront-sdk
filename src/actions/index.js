import CartActions from './CartActions';
import ComponentActions from './ComponentActions';
import EditorActions from './EditorActions';
import ProductActions from './ProductActions';
import SearchActions from './SearchActions';
import ResourceActions from './ResourceActions';

let actions = [
  {name: 'CartActions', obj: CartActions},
  {name: 'ComponentActions', obj: ComponentActions},
  {name: 'EditorActions', obj: EditorActions},
  {name: 'ProductActions', obj: ProductActions},
  {name: 'SearchActions', obj: SearchActions},
  {name: 'ResourceActions', obj: ResourceActions}
];

export default actions;
