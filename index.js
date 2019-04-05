const _ = require('lodash');

module.exports = function() {
  return ({ config, e, addUtilities }) => {
    const defaultDirections = {
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left',
    };
    const defaultColors = {};
    const defaultVariants = ['responsive'];

    const gradientUtilities = (function() {
      let utilities = {};
      _.forEach(config('theme.gradients.colors', defaultColors), (colors, colorKey) => {
        if (!_.isArray(colors) || colors.length === 1) {
          colors = ['transparent', _.isArray(colors) ? colors[0] : colors];
        }
        _.forEach(config('theme.gradients.directions', defaultDirections), (direction, directionKey) => {
          utilities[`.${e(`bg-gradient-${directionKey}-${colorKey}`)}`] = {
            backgroundImage: `linear-gradient(${direction}, ${colors.join(', ')})`,
          };
        });
      });
      return utilities;
    })();

    addUtilities(gradientUtilities, config('variants.gradients', defaultVariants));
  };
};
