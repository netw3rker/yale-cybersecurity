import React from 'react';

import exampleContentTwig from './example-content.twig';

import exampleData from './example-content.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Templates/Content' };

export const exampleContent = () => (
  <div dangerouslySetInnerHTML={{ __html: exampleContentTwig(exampleData) }} />
);
