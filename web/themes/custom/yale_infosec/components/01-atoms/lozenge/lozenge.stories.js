import React from 'react';

import twig from './lozenge.twig';

import dataRequired from './lozenge.yml';
import dataUpcoming from './lozenge~upcoming.yml';
import dataInternetAccess from './lozenge~internetaccess.yml';
import dataCheck from './lozenge~check.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Lozenge' };

export const Required = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(dataRequired) }} />
);

export const Upcoming = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(dataUpcoming) }} />
);

export const InternetAccess = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(dataInternetAccess) }} />
);

export const Large = () => (
  <div dangerouslySetInnerHTML={{ __html: twig({
    ...dataRequired,
    lozenge_modifiers: ['large']
    }) }} />
);

export const check = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(dataCheck) }} />
);
