import Immutable from 'immutable';
import { isArray } from 'lodash';
import immutable from 'alt/utils/ImmutableUtil';

let _getComponentProperties = function _getComponentProperties(state, _component) {
  let { name, role, area, constructor } = _component;

  if (_component.constructor && _component.constructor.storefront) {
    name = _component.constructor.storefront.name;
    role = _component.constructor.storefront.role;
    area = _component.constructor.storefront.area;
  }

  let component = Immutable.Map({
    role,
    area,
    constructor
  });

  return {name, component};
};

let _registerComponents = function _registerComponents(state, components) {
  return state.withMutations(map => {
    components.forEach( _component => {
      let {name, component} = _getComponentProperties(state, _component);
      return map.set(name, component);
    });
  });
};

@immutable
class ComponentStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ComponentActions);

    this.state = Immutable.Map();
  }

  onRegister(param) {
    let newState;
    if (isArray(param)) {
      newState = _registerComponents(this.state, param);
    } else {
      newState = _registerComponents(this.state, [param]);
    }

    this.setState(newState);
  }
}

export default ComponentStore;
