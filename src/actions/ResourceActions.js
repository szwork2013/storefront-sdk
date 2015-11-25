import Storefront from 'services/Storefront';

let storefrontService = new Storefront();

class ResourceActions {

  saveSettings({accountName, route, component, id, settings}) {
    storefrontService.saveAreaSettings({accountName, route, component, id, settings})
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

  getAreaResources(currentURL, area, params = {}, query = {}) {

    storefrontService.getAreaResources(area, params, query)
    .then((response) =>
      this.actions.getAreaResourcesSuccess(currentURL, area, params, response.data.resources)
    ).catch((error) =>
      this.actions.getAreaResourcesError(currentURL, area, params, error)
    );

    return {currentURL, area, params};
  }

  getAreaResourcesSuccess(currentURL, area, params, resources) {
    return {currentURL, area, params, resources};
  }

  getAreaResourcesError(currentURL, area, params, error) {
    return {currentURL, area, params, error};
  }
}

export default ResourceActions;
