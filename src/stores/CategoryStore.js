import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { isArray, values, flatten } from 'lodash';

function addCategories(state, categories) {
  if (!isArray(categories)) {
    categories = [categories];
  }

  let newCategories = state.withMutations(map => {
    categories.forEach( category => map.set(category.slug, category) );
  });

  return newCategories;
}

function getDataFromResources(state) {
  let resources = window.storefront.currentRoute.resources;
  let categories = flatten(values(resources['categories@vtex.storefront-sdk']));

  return addCategories(state, categories);
}

@immutable
class CategoryStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.CategoryActions);
    this.state = getDataFromResources(Immutable.Map());
  }
}

export default CategoryStore;

