import React from 'react';

import splitSection from './split-section.twig';

import splitSectionData from './split-section.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Split Section' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: splitSection(splitSectionData) }} />
);
