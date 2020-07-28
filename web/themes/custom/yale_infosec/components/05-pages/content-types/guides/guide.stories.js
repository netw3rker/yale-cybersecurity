import React from 'react';

import '../../../02-molecules/menus/main-menu/main-menu';

import guideTwig from './guide.twig';

import menuData from '../../../data/menus.yml';
import breadcrumbData from '../../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../../02-molecules/menus/inline/inline-menu.yml';

import heroGuideData from '../../../02-molecules/hero/hero-guide.yml';

import contentTypeData from '../content-types.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages|Content Types/Guides' };

export const guide = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: guideTwig({
        page_layout_modifier: 'contained',
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        ...heroGuideData,
        ...contentTypeData,
        card__link__text: 'Click here',
      }),
    }}
  />
);
