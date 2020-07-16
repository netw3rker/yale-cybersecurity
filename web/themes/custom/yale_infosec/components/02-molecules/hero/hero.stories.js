import React from 'react';

import hero from './hero.twig';

import heroData from './hero.yml';
import heroGuideData from './hero-guide.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Hero' };

export const heroExample = () => (
  <div dangerouslySetInnerHTML={{ __html: hero(heroData) }} />
);
export const heroGuide = () => (
  <div dangerouslySetInnerHTML={{ __html: hero({ ...heroData, ...heroGuideData }) }} />
);
