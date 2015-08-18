import decorate from './decorate';

function handleDescriptor(target, key, descriptor, [options = {}]) { // eslint-disable-line
  if (typeof descriptor.value !== 'function' || key !== 'render') {
    throw new SyntaxError('Only the render function can be marked as editable');
  }

  return {
    ...descriptor,
    value: function deprecationWrapper() {
      const editMode = this.props.EditorStore.get('isActive');
      const componentName = target.constructor.name + 'EditMode';
      const EditComponent = this.props.ComponentStore.getIn([componentName, 'constructor']);
      if (editMode && EditComponent) {
        return <EditComponent {...this.props}/>;
      }

      return descriptor.value.apply(this, arguments);
    }
  };
}

export default function editable(...args) {
  return decorate(handleDescriptor, args);
}
