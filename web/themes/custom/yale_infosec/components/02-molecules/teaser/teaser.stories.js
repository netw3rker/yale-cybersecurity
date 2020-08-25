import React from 'react';

import teaser from './teaser.twig';

import teaserData from './teaser.yml';
import teaserLightData from './teaser-light.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Teaser' };

export const Full = () => (
  <div dangerouslySetInnerHTML={{ __html: teaser(teaserData) }} />
);

export const Light = () => (
  <div className="cl-wrap--dark">
    <div dangerouslySetInnerHTML={{ __html: teaser(teaserLightData) }} />
  </div>
);
