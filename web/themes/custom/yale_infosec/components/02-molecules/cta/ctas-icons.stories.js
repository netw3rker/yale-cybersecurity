import React from 'react';

import ctaIcon from './cta-icon.twig';

import ctaIconData from './cta-icon.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/CTA/Icon' };

export const orange = () => (
  <div dangerouslySetInnerHTML={{ __html: ctaIcon({
    ...ctaIconData,
    cta_icon_modifiers: ['orange'],
    cta_icon_icon: 'know-your-risk',
  }) }} />
);
export const purple = () => (
  <div dangerouslySetInnerHTML={{ __html: ctaIcon({
    ...ctaIconData,
    cta_icon_modifiers: ['purple'],
    cta_icon_icon: 'click-with-caution',
  }) }} />
);
export const yellow = () => (
  <div dangerouslySetInnerHTML={{ __html: ctaIcon({
    ...ctaIconData,
    cta_icon_modifiers: ['yellow'],
    cta_icon_icon: 'apply-updates',
  }) }} />
);
export const darkGray = () => (
  <div dangerouslySetInnerHTML={{ __html: ctaIcon({
    ...ctaIconData,
    cta_icon_modifiers: ['green'],
    cta_icon_icon: 'use-secure-passwords',
  }) }} />
);
