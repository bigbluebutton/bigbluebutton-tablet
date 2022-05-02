/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const packageFolder = path.resolve('./node_modules/bigbluebutton-mobile-sdk/');

module.exports = {
  watchFolders: [packageFolder],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
