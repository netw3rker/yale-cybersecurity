import React from 'react';

import '../../02-molecules/menus/main-menu/main-menu';

import newsEvents from './news-events.twig';

import menuData from '../../data/menus.yml';
import breadcrumbData from '../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../02-molecules/menus/inline/inline-menu.yml';
import newsEventsData from './news-events.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages/Listings' };

export const newsAndEvents = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: newsEvents({
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        ...newsEventsData
      }),
    }}
  />
);
