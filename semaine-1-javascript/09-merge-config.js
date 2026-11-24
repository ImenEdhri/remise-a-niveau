export function mergeConfig(defaultConfig, userConfig) {
  const isObject = (obj) => obj && typeof obj === "object";
  if (!isObject(defaultConfig)) {
    throw new Error("defaultConfig must be an object");
  }
  const mergedUserConfig = isObject(userConfig) ? userConfig : {};
  
  Object.keys(defaultConfig).forEach((key) => {
    if (
      typeof defaultConfig[key] === "object" &&
      typeof mergedUserConfig[key] === "object"
    ) {
      mergedUserConfig[key] = mergeConfig(defaultConfig[key], mergedUserConfig[key]);
    }
  });

  const mergedConfig = { ...defaultConfig, ...userConfig };
  return mergedConfig;
}

// console.log(
//   mergeConfig(
//     { theme: "light", language: "en" },
//     { language: "fr", fontSize: 14 },
//   ),
// );
console.log(
  mergeConfig({ theme: { color: "bleu", size: 12 } }, null),
);
