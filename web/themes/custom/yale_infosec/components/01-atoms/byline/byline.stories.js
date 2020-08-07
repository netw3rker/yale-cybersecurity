import React from 'react';

import twig from './_byline.twig';

import data from './byline.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Byline' };

export const Byline = () => (
  <div style={{ paddingTop: '30px' }}>
    <div dangerouslySetInnerHTML={{ __html: twig(data) }} />
  </div>
);
