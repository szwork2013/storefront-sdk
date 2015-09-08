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

    this.exportPublicMethods({
      getCategories: this.getCategories
    });
  }

  getCategories(categories) {
    let result = [];

    for (var i = 0; i < categories.length; i++) {
      let category = this.state.get(categories[i]);
      if (category) {
        result.push(category);
      }
    }

    return result;
  }

  onRequestCategoriesSuccess(categories) {
    this.setState(addCategories(this.state, product));
  }

  onRequestCategoriesFail(error) {
    this.setState(this.state.set('error', error));
  }

}

export default CategoryStore;
