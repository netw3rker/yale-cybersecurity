import React from 'react';

import teaser from './teaser.twig';

import teaserData from './teaser.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Teaser' };

export const teaserExample = () => (
  <div dangerouslySetInnerHTML={{ __html: teaser(teaserData) }} />
);
