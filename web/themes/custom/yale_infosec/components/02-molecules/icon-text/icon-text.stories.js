import React from 'react';

import iconText from './icon-text.twig';

import iconTextData from './icon-text.yml';

import linkData from './icon-text-link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Icon with Text' };

export const Plain = () => (
  <div className="cl-wrap">
    <div dangerouslySetInnerHTML={{ __html: iconText(iconTextData) }} />
  </div>
);

export const Link = () => (
  <div className="cl-wrap">
    <div dangerouslySetInnerHTML={{ __html: iconText(linkData) }} />
  </div>
);
