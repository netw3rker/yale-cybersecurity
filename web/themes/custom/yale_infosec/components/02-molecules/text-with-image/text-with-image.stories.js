import React from 'react';

import textWithImage from './text-with-image.twig';

import textWithImageData from './text-with-image.yml';
import introTextData from './intro-text.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Text with Image' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: textWithImage(textWithImageData) }} />
);

export const IntroText = () => (
  <div dangerouslySetInnerHTML={{ __html: textWithImage({
    ...textWithImageData,
    ...introTextData
  }) }} />
);
