import React from 'react';

import '../../02-molecules/menus/main-menu/main-menu';

import articleTwig from './article.twig';
import guideTwig from './guide.twig';

import menuData from '../../data/menus.yml';
import breadcrumbData from '../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../02-molecules/menus/inline/inline-menu.yml';

import heroData from '../../02-molecules/hero/hero-guide.yml';

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

export const guide = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: guideTwig({
        page_layout_modifier: 'contained',
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        ...heroData,
        card__link__text: 'Click here',
      }),
    }}
  />
);
