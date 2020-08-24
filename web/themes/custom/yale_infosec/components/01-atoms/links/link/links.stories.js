import React from 'react';

import link from './link.twig';

import linkData from './link.yml';
import linkIconData from './link-icon.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Links' };

export const Example = () => (
  <div dangerouslySetInnerHTML={{ __html: link(linkData) }} />
);

export const Icon = () => (
  <div dangerouslySetInnerHTML={{ __html: link({ ...linkData, ...linkIconData }) }} />
);
