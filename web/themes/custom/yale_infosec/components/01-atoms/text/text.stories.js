import React from 'react';

import heading from './headings/_heading.twig';
import blockquote from './text/02-blockquote.twig';
import pre from './text/05-pre.twig';
import paragraph from './text/03-inline-elements.twig';
import exampleContentTwig from './text/04-example-content.twig';

import blockquoteData from './text/blockquote.yml';
import headingData from './headings/headings.yml';
import exampleData from './text/example-content.yml';

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
  <div dangerouslySetInnerHTML={{ __html: blockquote({ ...blockquoteData, blockquote_modifiers: ['sb'] }) }} />
);
export const preformatted = () => (
  <div dangerouslySetInnerHTML={{ __html: pre({}) }} />
);
export const random = () => (
  <div dangerouslySetInnerHTML={{ __html: paragraph({}) }} />
);
export const exampleContent = () => (
  <div dangerouslySetInnerHTML={{ __html: exampleContentTwig(exampleData) }} />
);
