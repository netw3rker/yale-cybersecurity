import React from 'react';

import grid from './grid.twig';
import gridContainerTwig from './grid-container.twig';

import gridData from './grid.yml';
import gridCardData from './grid-cards.yml';
import gridCardThreeData from './grid-cards-three.yml';
import gridCtaData from './grid-ctas.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Grids' };

export const defaultGrid = () => (
  <div dangerouslySetInnerHTML={{ __html: grid(gridData) }} />
);
export const cardGrid = () => (
  <div
    dangerouslySetInnerHTML={{ __html: grid({ ...gridData, ...gridCardData }) }}
  />
);
export const cardThreeGrid = () => (
  <div
    dangerouslySetInnerHTML={{ __html: grid({
      ...gridData,
      ...gridCardData,
      ...gridCardThreeData
    }) }}
  />
);
export const ctaGrid = () => (
  <div className="cl-mt">
    <div
      dangerouslySetInnerHTML={{ __html: gridContainerTwig({ ...gridData, ...gridCtaData }) }}
    />
  </div>
);
export const gridContainer = () => (
  <div
    dangerouslySetInnerHTML={{ __html: gridContainerTwig(gridData) }}
  />
);
