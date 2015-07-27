import Storefront from 'services/Storefront';

let storefrontService = new Storefront();

class SettingsActions {
  saveComponent({accountName, route, component, id, settings}) {

    storefrontService.saveComponentSettings({accountName, route, component, id, settings})
      .done(() => this.actions.saveComponentSuccess({route, id, settings}))
      .fail(this.actions.saveSettingsError);

    return arguments[0];
  }

  saveComponentSuccess(settings) {
    return settings;
  }

  saveComponentError(error) {
    return error;
  }

  requestComponent(route) {
    // TODO GET :account/routes/:route/resources
    return route;
  }

  requestComponentSuccess(Component) {
    return Component;
  }

  requestComponentError(error) {
    return error;
  }
}

export default SettingsActions;
