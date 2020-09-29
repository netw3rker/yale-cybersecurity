import React from 'react';

import tables from './tables.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Tables' };

export const table = () => (
  <div dangerouslySetInnerHTML={{ __html: tables({}) }} />
);

export const tableLightGrayBg = () => (
  <div className="cl-wrap bg bg--light-gray">
    <div dangerouslySetInnerHTML={{ __html: tables({}) }} />
  </div>
);

export const tableGrayBg = () => (
  <div className="cl-wrap bg bg--gray">
    <div dangerouslySetInnerHTML={{ __html: tables({}) }} />
  </div>
);

export const tableDarkGrayBg = () => (
  <div className="cl-wrap bg bg--dark-gray">
    <div dangerouslySetInnerHTML={{ __html: tables({}) }} />
  </div>
);

export const tableLightBlueBg = () => (
  <div className="cl-wrap bg bg--light-blue">
    <div dangerouslySetInnerHTML={{ __html: tables({}) }} />
  </div>
);

export const tableBlueBg = () => (
  <div className="cl-wrap bg bg--blue">
    <div dangerouslySetInnerHTML={{ __html: tables({}) }} />
  </div>
);

export const tableBlueDark = () => (
  <div className="cl-wrap bg bg--dark-blue">
    <div dangerouslySetInnerHTML={{ __html: tables({}) }} />
  </div>
);
