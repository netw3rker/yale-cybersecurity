import React from 'react';

import logo from './logo.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Logo' };

export const Example = () => (
  <div className="cl-wrap--dark">
    <div dangerouslySetInnerHTML={{ __html: logo({ link_modifiers: ['sb'] }) }} />
  </div>
);
