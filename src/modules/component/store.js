import storefront from 'storefront';
import Immutable from 'immutable';
import isArray from 'lodash/lang/isArray';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class ComponentStore {
  constructor() {
    this.bindActions(storefront.flux.actions.ComponentActions);

    this.state = Immutable.Map();
  }

  _getComponentProperties = ({name, role, area, constructor}) => {
    if (this.state.get(name)) {
      console.warn(`${name} was overwritten by ${constructor.name}`);
    }

    let component = Immutable.Map({
      role,
      area,
      constructor
    });

    return {name, component};
  }

  _registerComponent = (_component) => {
    let {name, component} = this._getComponentProperties(_component);

    return this.state.set(name, component);
  }

  _registerComponents = (components) => {
    return this.state.withMutations(map => {
      components.forEach( _component => {
        let {name, component} = this._getComponentProperties(_component);
        return map.set(name, component);
      });
    });
  }

  onRegister(param) {
    let newState;
    if (isArray(param)) {
      newState = this._registerComponents(param);
    } else {
      newState = this._registerComponent(param);
    }

    this.setState(newState);
  }
}

export default ComponentStore;
