import React from 'react';

import textSection from './text-section.twig';

import textSectionData from './text-section.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Text Section' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: textSection(textSectionData) }} />
);
