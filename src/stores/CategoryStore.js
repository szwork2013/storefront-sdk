import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { isArray } from 'lodash-compat/lang';
import { values } from 'lodash-compat/object';
import { flatten } from 'lodash-compat/array';
import { rest } from 'lodash-compat/array';
import { filter } from 'lodash-compat/collection';

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

  getCategory(slugs, categories = this.state.toJS()) {
    let category = filter(categories, function(cat) {
      return cat.slug === slugs[0];
    })[0];

    return slugs.length === 1 ?
      category : this.getCategory(rest(slugs), category.children);
  }
}

export default CategoryStore;

