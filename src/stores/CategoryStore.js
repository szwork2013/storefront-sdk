import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { isArray } from 'lodash-compat/lang';
import { values } from 'lodash-compat/object';
import { flatten } from 'lodash-compat/array';
import { filter } from 'lodash-compat/collection';
import { rest } from 'lodash-compat/array';

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
      getCategory: this.getCategory
    });
  }

  getCategory(slugs) {
    let filterCategory = function(categories, slugs) {
      let filteredCategories = filter(categories, function(category) {
        return category.slug === slugs[0];
      }).pop();

      if (slugs.length === 1) {
        return filteredCategories;
      }

      return filterCategory(filteredCategories.children, rest(slugs));
    }

    return filterCategory(this.state.toJS(), slugs);
  }
}

export default CategoryStore;

