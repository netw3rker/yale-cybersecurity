import React from 'react';

import cta from './cta.twig';

import ctaData from './cta.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/CTA/Color' };

export const darkBlue = () => (
  <div dangerouslySetInnerHTML={{ __html: cta(ctaData) }} />
);
export const lightBlue = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['light-blue'],
  }) }} />
);
export const muted = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['muted'],
  }) }} />
);
export const mutedDark = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['dark-muted'],
  }) }} />
);
export const darkGray = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['dark-gray'],
  }) }} />
);
