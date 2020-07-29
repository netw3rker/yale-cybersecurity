import React from 'react';

import imageSection from './image-section.twig';

import imageSectionData from './image-section.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Image Section' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: imageSection(imageSectionData) }} />
);
