import React from 'react';
import { storiesOf } from '@storybook/react';
import { hrefTo } from '@storybook/addon-links';

import '../../02-molecules/menus/main-menu/main-menu';

import home from './home.twig';

import menuData from '../../data/menus.yml';
import breadcrumbData from '../../02-molecules/menus/breadcrumbs/breadcrumbs.yml';
import socialMenuData from '../../02-molecules/menus/social/social-menu.yml';
import footerMenuData from '../../02-molecules/menus/inline/inline-menu.yml';

import ctaData from '../../02-molecules/cta/cta.yml';
import ctaImageData from '../../02-molecules/cta/cta-image.yml';
import ctaFeaturedData from '../../02-molecules/cta/cta-image-featured.yml';

/**
 * Storybook Definition.
 */
hrefTo('Pages/Content Types', 'Article').then(url => {
  // TODO: Can't figure out how to link pages with hrefTo and storiesOf.
  storiesOf('Pages/Landing Pages', module).add('Home', () => {
    return (
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
            ...ctaFeaturedData
          }),
        }}
      />
    );
  });
});
