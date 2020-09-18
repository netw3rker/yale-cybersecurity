import React from 'react';

import cta from './cta.twig';

import ctaData from './cta.yml';
import ctaImageData from './cta-image.yml';
import ctaImageFeaturedData from './cta-image-featured.yml';
import ctaImageFeaturedLeftData from './cta-image-featured-left.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/CTA/Image/Featured' };

export const imageRight = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    ...ctaImageData,
    ...ctaImageFeaturedData
  }) }} />
);

export const imageLeft = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    ...ctaImageData,
    ...ctaImageFeaturedData,
    ...ctaImageFeaturedLeftData
  }) }} />
);
