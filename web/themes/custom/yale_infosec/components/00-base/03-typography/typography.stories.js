import React from 'react';

// Twig templates
import typeFaces from './type-faces.twig';
// Data files
import typeFacesData from './type-faces.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Base/Typography' };

export const TypeFaces = () => (
  <div dangerouslySetInnerHTML={{ __html: typeFaces(typeFacesData) }} />
);
