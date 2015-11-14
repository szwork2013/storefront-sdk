import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import isArray from 'lodash-compat/lang/isArray';
import values from 'lodash-compat/object/values';
import flatten from 'lodash-compat/array/flatten';

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

function getDataFromResources(state, resources) {
  let categories = flatten(values(resources['categories@vtex.storefront-sdk']));

  return addCategories(state, categories);
}

@immutable
class CategoryStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.CategoryActions);
    this.bindActions(dispatcher.actions.ResourceActions);
    let resources = window.storefront.currentRoute.resources;

    this.state = getDataFromResources(Immutable.Map(), resources);
  }

  onGetRouteResourcesSuccess({ resources }) {
    this.setState(getDataFromResources(this.state, resources));
  }
}

export default CategoryStore;
