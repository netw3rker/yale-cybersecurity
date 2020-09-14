import React from 'react';

import '../../02-molecules/menus/main-menu/main-menu';

import home from './home.twig';

import menuData from '../../data/menus.yml';
import breadcrumbData from '../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../02-molecules/menus/inline/inline-menu.yml';

import ctaData from '../../02-molecules/cta/cta.yml';
import ctaImageData from '../../02-molecules/cta/cta-image.yml';
import ctaFeaturedData from '../../02-molecules/cta/cta-image-featured.yml';

import homeData from './home.yml';

export default { title: 'Pages/Landing Pages' };

export const homePage = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: home({
        page_layout_modifier: 'contained',
        ...menuData,
        ...breadcrumbData,
        ...socialMenuData,
        ...footerMenuData,
        ...ctaData,
        ...ctaImageData,
        ...ctaFeaturedData,
        ...homeData
      }),
    }}
  />
);
