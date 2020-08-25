import React from 'react';

import teaserList from './teaser-list.twig';

import teaserListData from './teaser-list.yml';

import teaserListLightData from './teaser-list-light.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Lists' };

export const teaser = () => (
  <div dangerouslySetInnerHTML={{ __html: teaserList(teaserListData) }} />
);

export const teaserLight = () => (
  <div className="cl-wrap--dark">
    <div dangerouslySetInnerHTML={{ __html: teaserList(teaserListLightData) }} />
  </div>
);
