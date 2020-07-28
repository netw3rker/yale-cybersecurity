import React from 'react';

import '../../../02-molecules/menus/main-menu/main-menu';

import noImageTwig from './no-image.twig';
import withImageTwig from './with-image.twig';

import menuData from '../../../data/menus.yml';
import breadcrumbData from '../../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../../02-molecules/menus/inline/inline-menu.yml';

import contentTypeData from '../content-types.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages|Content Types/Basic Pages' };

export const noImage = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: noImageTwig({
        page_layout_modifier: 'contained',
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        ...contentTypeData,
        card__link__text: 'Click here',
      }),
    }}
  />
);

export const withImage = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: withImageTwig({
        page_layout_modifier: 'contained',
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        ...contentTypeData,
        card__link__text: 'Click here',
      }),
    }}
  />
);
