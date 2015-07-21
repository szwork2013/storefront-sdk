import storefront from 'storefront';
import Storefront from 'services/Storefront';

let storefrontService = new Storefront();

class ComponentActions {
  saveSettings({accountName, route, component, id, settings}) {

    storefrontService.saveComponentSettings({accountName, route, component, id, settings})
      .done(() => this.actions.saveSettingsSuccess({route, id, settings}))
      .fail(this.actions.saveSettingsError);

    return arguments[0];
  }

  saveSettingsSuccess(settings) {
    return settings;
  }

  saveSettingsError(error) {
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

storefront.flux.addActions('ComponentActions', ComponentActions);
