import React from 'react';

import button from './button.twig';

import buttonData from './button.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Buttons/Icons' };

export const before = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_icon_before: 'book',
    button_modifiers: ['primary']
  }) }} />
);
export const after = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_icon_after: 'check',
    button_modifiers: ['secondary']
  }) }} />
);
export const beforeAndAfter = () => (
  <div dangerouslySetInnerHTML={{ __html: button({
    ...buttonData,
    button_icon_before: 'instagram',
    button_icon_after: 'arrow-right',
    button_modifiers: ['yale-light']
  }) }} />
);
