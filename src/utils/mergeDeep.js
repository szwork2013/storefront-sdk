import Immutable from 'immutable';

/**
- *  This functions merges the saved settings with the hard coded settings
- *  both parameters can be an Immutable Map or a JSON, the later will be
- *  converted to an Immutable Map.
- *  Always returns an Immutable Map
- *
- *  eg:
- *    settings = Immutable.Map() with { title: 'Hi!', desc: 'World' }
- *    codedSettings = { title: 'Always show this' }
- *  returns:
- *    Immutable.Map() with { title: 'Always show this', desc: 'World!' }
- */
export default function mergeDeep(settings, codedSettings) {
  if (settings) {
    if (!Immutable.Map.isMap(settings)) {
      settings = Immutable.fromJS(settings);
    }
  } else {
    settings = Immutable.Map();
  }

  if (codedSettings) {
    if (!Immutable.Map.isMap(codedSettings)) {
      codedSettings = Immutable.fromJS(codedSettings);
    }
  } else {
    codedSettings = Immutable.Map();
  }

  return settings.mergeDeep(codedSettings);
}
