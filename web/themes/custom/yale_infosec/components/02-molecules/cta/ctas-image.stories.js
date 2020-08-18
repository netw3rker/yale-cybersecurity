import React from 'react';

import cta from './cta.twig';

import ctaData from './cta.yml';
import ctaImageData from './cta-image.yml';
import ctaImageLightData from './cta-image-light.yml';
import ctaImageFeaturedData from './cta-image-featured.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules|CTA/Image' };

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
export const Featured = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    ...ctaImageData,
    ...ctaImageFeaturedData
  }) }} />
);
