import features_spec from './features_spec'

const FT_OVERRIDE_PARAM = 'ft_ovr';
const FT_OVERRIDE_SPLIT_CHAR = '|';
const FT_OVERRIDE_VALUE_CHAR = '>';

// you can override by ft_ovr query string param:
// e.g. ?ft_ovr=submission>true|voting>false
function getOverrides(params) {
  if (params && params[FT_OVERRIDE_PARAM]) {
    let overrides = params[FT_OVERRIDE_PARAM].split(FT_OVERRIDE_SPLIT_CHAR);

    let res = {};
    overrides.forEach(ovr => {
      let split = ovr.split(FT_OVERRIDE_VALUE_CHAR);
      let key = split[0] || '';
      let value = split[1] || 'false';

      if (key.trim() !== '') {
        res[key] = value === 'true';
      }
    });

    return res;
  }

  return {};
}

export default function getFeatureValue(name, defaultValue, params) {
  let overrides = getOverrides(params);

  console.log(overrides);

  if (features_spec[name] !== undefined &&
      overrides[name] !== undefined) {
    return overrides[name];
  } else if (features_spec[name] !== undefined) {
    return features_spec[name];
  } else {
    return defaultValue;
  }
}
