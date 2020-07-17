import React from 'react';

import cta from './cta.twig';

import ctaData from './cta.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules|CTA/Color' };

export const yaleOrangeButton = () => (
  <div dangerouslySetInnerHTML={{ __html: cta(ctaData) }} />
);
export const yaleLightOrangeButton = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['yale-light'],
  }) }} />
);
export const mutedOrangeButton = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['muted'],
  }) }} />
);
export const mutedDarkOrangeButton = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['muted-dark'],
  }) }} />
);
export const darkOrangeButton = () => (
  <div dangerouslySetInnerHTML={{ __html: cta({
    ...ctaData,
    cta__modifiers: ['deep'],
  }) }} />
);
