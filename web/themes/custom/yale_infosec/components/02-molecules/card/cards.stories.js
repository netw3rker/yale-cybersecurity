import React from 'react';

import card from './card.twig';

import cardData from './card.yml';

import eventData from './card-event.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Cards' };

export const cardExample = () => (
  <div dangerouslySetInnerHTML={{ __html: card(cardData) }} />
);

export const Event = () => (
  <div dangerouslySetInnerHTML={{ __html: card({ ...cardData, ...eventData }) }} />
);
