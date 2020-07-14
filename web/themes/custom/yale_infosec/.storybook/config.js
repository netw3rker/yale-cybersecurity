import { configure, addDecorator, addParameters } from '@storybook/react';
import { useEffect } from "@storybook/client-api";
import { withA11y } from '@storybook/addon-a11y';

// Theming
import emulsifyTheme from './emulsifyTheme';

addParameters({
  options: {
    theme: emulsifyTheme,
  },
});

// GLOBAL CSS
import '../components/style-cl.scss';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';

addDecorator(storyFn => {
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn()
});

addDecorator(withA11y);

const Twig = require('twig');
const twigDrupal = require('twig-drupal-filters');
const twigBEM = require('bem-twig-extension');
const twigAddAttributes = require('add-attributes-twig-extension');

Twig.cache();

twigDrupal(Twig);
twigBEM(Twig);
twigAddAttributes(Twig);

// automatically import all files ending in *.stories.js
configure(require.context('../components', true, /\.stories\.js$/), module);
