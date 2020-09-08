import React from 'react';

import heading from './headings/_heading.twig';
import blockquote from './text/02-blockquote.twig';
import pre from './text/05-pre.twig';
import paragraph from './text/03-inline-elements.twig';

import blockquoteData from './text/blockquote.yml';
import headingData from './headings/headings.yml';

import './headings/page-title';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

// Loop over items in headingData to show each one in the example below.
const headings = headingData.map(d => heading(d)).join('');

export const headingsExamples = () => (
  <div dangerouslySetInnerHTML={{ __html: headings }} />
);
export const blockquoteExample = () => (
  <div
    className="cl-wrap"
    dangerouslySetInnerHTML={{
      __html: blockquote({ ...blockquoteData, blockquote_modifiers: ['sb'] }),
    }}
  />
);
export const preformatted = () => (
  <div dangerouslySetInnerHTML={{ __html: pre({}) }} />
);
export const random = () => (
  <div dangerouslySetInnerHTML={{ __html: paragraph({}) }} />
);

export const pageTitle = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: heading({
        heading_level: '1',
        heading_base_class: 'page-title',
        heading:
          'YALE-MSS-1.1.1: Classify the IT System as high, moderate, or low risk.',
      }),
    }}
  />
);

export const pageTitleLong = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: heading({
        heading_level: '1',
        heading_base_class: 'page-title',
        heading_modifiers: ['long'],
        heading:
          'YALE-MSS-1.1.1: Classify the IT System as high, moderate, or low risk based on data classification, availability requirements, and external obligations.',
      }),
    }}
  />
);
