import React from 'react';

import button from './button.twig';

import buttonData from './button.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Buttons' };

export const primary = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_modifiers: ['primary']
  }) }} />
);
export const secondary = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_modifiers: ['secondary']
  }) }} />
);
export const yale = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_modifiers: ['yale']
  }) }} />
);
export const yaleLight = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_modifiers: ['yale-light']
  }) }} />
);
export const muted = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_modifiers: ['muted']
  }) }} />
);
export const mutedDark = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_modifiers: ['muted-dark']
  }) }} />
);
