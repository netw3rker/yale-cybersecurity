import React from 'react';

import colors from '@yalesites-org/yale-twig/00-base/01-colors/colors.twig';

import yaleColorData from '@yalesites-org/yale-twig/00-base/01-colors/colors.yml';
import colorData from './colors.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Base/Colors' };

export const Palettes = () => (
  <div dangerouslySetInnerHTML={{ __html: colors({ ...yaleColorData, ...colorData }) }} />
);
