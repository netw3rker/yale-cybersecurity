import React from 'react';

import '../../../02-molecules/menus/main-menu/main-menu';

import eventsTwig from './events.twig';

import menuData from '../../../data/menus.yml';
import breadcrumbData from '../../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../../02-molecules/menus/inline/inline-menu.yml';

import contentTypeData from '../content-types.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages|Content Types/Events' };

export const event = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: eventsTwig({
        page_layout_modifier: 'contained',
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        ...contentTypeData,
      }),
    }}
  />
);
