import React from 'react';

import primaryTwig from './primary.twig';

import mainMenu from '../02-molecules/menus/main-menu/main-menu.yml';
import socialMenu from '../02-molecules/menus/social/social-menu.yml';
import footerMenu from '../02-molecules/menus/inline/inline-menu.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Templates/Layouts' };

export const Primary = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: primaryTwig({ ...mainMenu, ...socialMenu, ...footerMenu }),
    }}
  />
);
