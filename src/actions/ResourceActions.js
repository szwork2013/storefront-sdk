import Storefront from 'services/Storefront';

let storefrontService = new Storefront();

class ResourceActions {

  saveSettings({accountName, route, component, id, settings}) {
    storefrontService.saveComponentSettings({accountName, route, component, id, settings})
      .then(() => this.actions.saveSettingsSuccess({route, id, settings}))
      .catch(this.actions.saveSettingsError);

    return arguments[0];
  }

  saveSettingsSuccess(settings) {
    return settings;
  }

  saveSettingsError(error) {
    return error;
  }

  getRouteResources(currentURL, route, params = {}) {
    let resources = storefrontService.getRouteResources(route, params);
    let settings = storefrontService.getRouteSettings(route);

    Promise.all([resources, settings])
      .then((response) => {
        let [resourcesResponse, settingsResponse ] = response;
        resourcesResponse.data.resources._settings = settingsResponse.data;
        this.actions.getRouteResourcesSuccess(currentURL, route, params, resourcesResponse.data.resources);
      })
      .catch((error) => this.actions.requestResoucesError(currentURL, route, params, error));

    return {currentURL, route, params};
  }

  getRouteResourcesSuccess(currentURL, route, params, resources) {
    return {currentURL, route, params, resources};
  }

  getRouteResourcesError(currentURL, route, params, error) {
    return {currentURL, route, params, error};
  }
}

export default ResourceActions;
