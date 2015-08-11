import Immutable from 'immutable';
import isArray from 'lodash/lang/isArray';
import immutable from 'alt/utils/ImmutableUtil';

let _getComponentProperties = function _getComponentProperties(state, {name, role, area, constructor}) {
  if (state.get(name)) {
    console.warn(`${name} was overwritten by ${constructor.name}`);
  }

  let component = Immutable.Map({
    role,
    area,
    constructor
  });

  return {name, component};
};

let _registerComponent = function _registerComponent(state, _component) {
  let {name, component} = _getComponentProperties(state, _component);

  return state.set(name, component);
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
      newState = _registerComponent(this.state, param);
    }

    this.setState(newState);
  }
}

export default ComponentStore;
