import React from 'react';

import '../../02-molecules/menus/main-menu/main-menu';

import articleTwig from './article.twig';

import menuData from '../../data/menus.yml';
import breadcrumbData from '../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../02-molecules/menus/inline/inline-menu.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages/Content Types' };

export const article = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: articleTwig({
        page_layout_modifier: 'contained',
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        card__link__text: 'Click here',
      }),
    }}
  />
);
