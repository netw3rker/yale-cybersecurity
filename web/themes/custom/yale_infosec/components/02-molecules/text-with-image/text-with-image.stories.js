import React from 'react';

import textWithImage from './text-with-image.twig';

import textWithImageData from './text-with-image.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Text with Image' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: textWithImage(textWithImageData) }} />
);
