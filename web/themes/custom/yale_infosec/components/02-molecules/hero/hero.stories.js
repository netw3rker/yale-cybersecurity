import React from 'react';

import hero from './hero.twig';

import heroData from './hero.yml';
import heroGuideData from './hero-guide.yml';
import heroHomeData from './hero-home.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Hero' };

export const basic = () => (
  <div dangerouslySetInnerHTML={{ __html: hero(heroData) }} />
);
export const guide = () => (
  <div dangerouslySetInnerHTML={{ __html: hero({ ...heroData, ...heroGuideData }) }} />
);
export const home = () => (
  <div dangerouslySetInnerHTML={{ __html: hero({ ...heroData, ...heroHomeData }) }} />
);
