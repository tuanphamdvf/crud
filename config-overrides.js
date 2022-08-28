const { override } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@base-color': '#3f83f8' }
      }
    }
  })
);
