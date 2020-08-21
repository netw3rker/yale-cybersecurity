import React from 'react';

import card from './card.twig';

import cardData from './card.yml';
import eventData from './card-event.yml';
import sbsData from './card-sbs.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Cards' };

export const Basic = () => (
  <div dangerouslySetInnerHTML={{ __html: card(cardData) }} />
);

export const Blue = () => (
  <div dangerouslySetInnerHTML={{ __html: card({
    ...cardData,
    card__modifiers: ['blue'],
    card__heading: 'Report'
  }) }} />
);

export const Event = () => (
  <div dangerouslySetInnerHTML={{ __html: card({ ...cardData, ...eventData }) }} />
);

export const SidebySide = () => (
  <div dangerouslySetInnerHTML={{ __html: card({
    ...cardData,
    ...eventData,
    ...sbsData
  }) }} />
);
