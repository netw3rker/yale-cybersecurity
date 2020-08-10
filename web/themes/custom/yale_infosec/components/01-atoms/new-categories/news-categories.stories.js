import React from 'react';

import twig from './_news-categories.twig';

import data from './news-categories.yml';
import dataSingle from './news-categories-single.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/News Categories' };

export const Single = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(dataSingle) }} />
);
export const Multiple = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(data) }} />
);
