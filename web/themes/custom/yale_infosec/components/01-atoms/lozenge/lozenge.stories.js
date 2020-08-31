import React from 'react';

import twig from './lozenge.twig';

import dataRequired from './lozenge.yml';
import dataUpcoming from './lozenge~upcoming.yml';
import dataInternetAccess from './lozenge~internetaccess.yml';

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
