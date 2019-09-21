module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: '> 0.25%, not dead',
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
