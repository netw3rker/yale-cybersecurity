import React from 'react';

import cta from './cta.twig';

import ctaData from './cta.yml';
import ctaImageData from './cta-image.yml';
import ctaImageLightData from './cta-image-light.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules|CTA/Image/Plain' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({ ...ctaData, ...ctaImageData }) }} />
);
export const TwoButtons = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    ...ctaImageData,
    ...ctaImageLightData
  }) }} />
);
