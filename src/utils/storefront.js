import decorate from './decorate';
import editable from './editable';
import dispatcher from '../dispatcher/StorefrontDispatcher';

function validateParams(target, key) {
  let className = target ? target.name : 'Component';

  if (key.length !== 1) {
    console.error('@register require an object as a parameter');
    return false;
  }

  let metadata = key[0];
  if (!metadata.name) {
    console.error(className + ' is trying to @register a component without the required property "name"');
    return false;
  }

  let componentRegex = new RegExp(/([\w\d\-\_]+)@([\w\d\-\_]+)\.([\w\d\-\_]+)/);
  if (!componentRegex.test(metadata.name)) {
    console.error('Component name is not in the right format: <component>@<vendor>.<app>: ' + metadata.name);
    return false;
  }

  if (!(dispatcher.actions && dispatcher.actions.ComponentActions)) {
    console.error('Can\'t register component ' + className + '. Couldn\'t find action "ComponentActions.register" in dispatcher');
    return false;
  }
  if (!(dispatcher.stores && dispatcher.stores.ComponentStore)) {
    console.error('Can\'t register component ' + className + '. Couldn\'t find store "ComponentStore" in dispatcher');
    return false;
  }

  return true;
}

function handleDescriptor(target, key) {
  if (!validateParams(target, key)) {
    return target;
  }

  let metadata = key[0];

  // Wrap editable component
  if (metadata.editable) {
    target = editable(metadata)(target);
  }

  if (metadata.name) {
    target.storefront = target.storefront || {};
    target.storefront.name = metadata.name;
  }

  return target;
}

export default function storefront(...args) {
  return decorate(handleDescriptor, args);
}
