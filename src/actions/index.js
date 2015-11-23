import CartActions from './CartActions';
import ComponentActions from './ComponentActions';
import ContextActions from './ContextActions';
import ProductActions from './ProductActions';
import ResourceActions from './ResourceActions';
import SearchActions from './SearchActions';

let actions = [
  {name: 'CartActions', obj: CartActions},
  {name: 'ComponentActions', obj: ComponentActions},
  {name: 'ContextActions', obj: ContextActions},
  {name: 'ProductActions', obj: ProductActions},
  {name: 'ResourceActions', obj: ResourceActions},
  {name: 'SearchActions', obj: SearchActions}
];

export default actions;
