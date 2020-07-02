// Documentation on theming Storybook: https://storybook.js.org/docs/configurations/theming/

import { create } from '@storybook/theming';

export default create({
  base: 'light',
  // Branding
  brandTitle: 'IT at Yale',
  brandUrl: 'https://cybersecurity.yale.edu/',
  brandImage:
    'logo.png',
});
