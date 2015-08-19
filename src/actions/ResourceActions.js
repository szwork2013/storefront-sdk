import Storefront from 'services/Storefront';

let storefrontService = new Storefront();

class ResourceActions {

  saveSettings({accountName, route, component, id, settings}) {
    storefrontService.saveComponentSettings({accountName, route, component, id, settings})
      .then(() => this.actions.saveComponentSuccess({route, id, settings}))
      .catch(this.actions.saveSettingsError);

    return arguments[0];
  }

  saveSettingsSuccess(settings) {
    return settings;
  }

  saveSettingsError(error) {
    return error;
  }

  getRouteResources(route, params = {}) {
    storefrontService.getRouteResources(route, params)
      .then((response) => this.actions.getRouteResourcesSuccess(route, params, response.data.resources))
      .catch((error) => this.actions.requestResoucesError(route, params, error));

    return { route, params };
  }

  getRouteResourcesSuccess(route, params, resources) {
    return {route, params, resources};
  }

  getRouteResourcesError(route, params, error) {
    return {route, params, error};
  }
}

export default ResourceActions;
