import React from 'react';

import twig from './_tags.twig';

import data from './tags.yml';
import dataSingle from './tags-single.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Tags' };

export const Single = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(dataSingle) }} />
);
export const Multiple = () => (
  <div dangerouslySetInnerHTML={{ __html: twig(data) }} />
);
