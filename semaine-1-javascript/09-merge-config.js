function mergeConfig(defaultConfig, userConfig) {
  const mergedConfig = { ...defaultConfig, ...userConfig };
  return mergedConfig;
}   

console.log(mergeConfig({ theme: "light", language: "en" }, { language: "fr", fontSize: 14 }));
