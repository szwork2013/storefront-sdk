import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { isArray } from 'lodash-compat/lang';
import { values } from 'lodash-compat/object';
import { flatten } from 'lodash-compat/array';
import { rest } from 'lodash-compat/array';

function addCategories(state, categories) {
  if (!isArray(categories)) {
    categories = [categories];
  }

  let newCategories = state.withMutations(map => {
    categories.forEach((category) => {
      map.set(category.slug, Immutable.fromJS(category));
    });
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
      getCategory: this.getCategory
    });
  }

  // Returns a category given an array of hierarchical category slugs
  getCategory(slugs, categories = this.state) {
    let category = categories.filter(function(cat) {
      return cat.get('slug') === slugs[0];
    }).first();

    return slugs.length === 1 ?
      category : this.getCategory(rest(slugs), category.get('children'));
  }
}

export default CategoryStore;

