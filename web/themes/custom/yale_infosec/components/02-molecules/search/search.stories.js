import React from 'react';

import searchBlock from './search.twig';

import './search';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Search' };

export const Example = () => (
  <div className="cl-wrap--dark">
    <div dangerouslySetInnerHTML={{ __html: searchBlock() }} />
  </div>
);
