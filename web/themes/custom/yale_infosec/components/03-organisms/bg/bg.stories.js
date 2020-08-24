import React from 'react';

import bg from './bg.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Backgrounds' };

export const LightGray = () => (
  <div dangerouslySetInnerHTML={{ __html: bg({
    bg__extra_classes: ['cl-wrap'],
    bg__modifiers: ['light-gray']
  }) }} />
);

export const Gray = () => (
  <div dangerouslySetInnerHTML={{ __html: bg({
    bg__extra_classes: ['cl-wrap'],
    bg__modifiers: ['gray']
  }) }} />
);

export const LightBlue = () => (
  <div dangerouslySetInnerHTML={{ __html: bg({
    bg__extra_classes: ['cl-wrap'],
    bg__modifiers: ['light-blue']
  }) }} />
);

export const Blue = () => (
  <div dangerouslySetInnerHTML={{ __html: bg({
    bg__extra_classes: ['cl-wrap'],
    bg__modifiers: ['blue']
  }) }} />
);

export const YaleBlue = () => (
  <div dangerouslySetInnerHTML={{ __html: bg({
    bg__extra_classes: ['cl-wrap'],
    bg__modifiers: ['dark-blue']
  }) }} />
);

export const DarkGray = () => (
  <div dangerouslySetInnerHTML={{ __html: bg({
    bg__extra_classes: ['cl-wrap'],
    bg__modifiers: ['dark-gray']
  }) }} />
);

export const TopShadow = () => (
  <div dangerouslySetInnerHTML={{ __html: bg({
    bg__extra_classes: ['cl-wrap'],
    bg__modifiers: ['blue', 'top-shadow']
  }) }} />
);
