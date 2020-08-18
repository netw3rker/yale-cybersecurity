import React from 'react';

import date from './date.twig';

import dateData from './date.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Date' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: date(dateData) }} />
);
