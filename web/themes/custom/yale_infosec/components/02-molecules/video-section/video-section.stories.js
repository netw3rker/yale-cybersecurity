import React from 'react';

import videoSection from './video-section.twig';

import videoSectionData from './video-section.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Video Section' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: videoSection(videoSectionData) }} />
);
