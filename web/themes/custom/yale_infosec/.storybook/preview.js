import { addDecorator } from '@storybook/react';
import { useEffect } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// Theming
import emulsifyTheme from './emulsifyTheme';

// GLOBAL CSS
import '../components/style.scss';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';

const Twig = require('twig');
const twigDrupal = require('twig-drupal-filters');
const twigBEM = require('bem-twig-extension');
const twigAddAttributes = require('add-attributes-twig-extension');

Twig.cache();

twigDrupal(Twig);
twigBEM(Twig);
twigAddAttributes(Twig);

export const parameters = {
  options: {
    theme: emulsifyTheme,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

// addDecorator deprecated, but not sure how to use this otherwise.
addDecorator((storyFn) => {
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn();
});
