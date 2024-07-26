module.exports = {
  plugin: (schema, documents, config) => {
    // Return the wrapped content
    return `// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
      export module ${config.wrapModule.name} {`;
  },
};
