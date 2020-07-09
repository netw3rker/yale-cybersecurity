import React from 'react';

import button from './button.twig';

import buttonData from './button.yml';
import buttonAltData from './button-alt.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Buttons' };

export const primary = () => (
  <div dangerouslySetInnerHTML={{ __html: button(buttonData) }} />
);
export const secondary = () => (
  <div dangerouslySetInnerHTML={{ __html: button(buttonAltData) }} />
);
