module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-export-default-from"],
    [
      "@babel/plugin-transform-runtime",
       {
         "helpers": true,
         "regenerator": true
       }
    ]
  ]
};
