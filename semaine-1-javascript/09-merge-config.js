export function mergeConfig(defaultConfig, userConfig) {
 return deepMerge(defaultConfig, userConfig)
}
function deepMerge(defaultConfig, userConfig) {

  const result = { ...defaultConfig };

  if (!isObject(userConfig)) {
    return result;
  }

  for (const key in userConfig) {
    if (
      isObject(userConfig[key]) &&
      isObject(defaultConfig[key])
    ) {
      result[key] = deepMerge(
        defaultConfig[key],
        userConfig[key]
      );
    } else {
      result[key] = userConfig[key];
    }
  }

  return result;
}

function isObject(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value);
}


