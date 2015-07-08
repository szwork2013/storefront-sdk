import storefront from 'storefront';
import $ from 'jQuery';

class ComponentActions {
  saveSettings({accountName, route, component, id, settings}) {
    const url = `http://api.beta.vtex.com/${accountName}/storefront/components/${route}/${id}`;
    const data = {
      'component': component,
      'settings': settings
    };
    const token = storefront.flux.stores.ShopStore.getState().get('token');
    const authorization = `token ${token}`;

    $.ajax({
      url: url,
      method: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {
        'Accept': 'application/vnd.vtex.storefront.v0+json',
        'Authorization': authorization
      },
      data: JSON.stringify(data)
    }).done(() => this.actions.saveSettingsSuccess({route, id, settings}))
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
