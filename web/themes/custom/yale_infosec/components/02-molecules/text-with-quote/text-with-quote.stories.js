import React from 'react';

import textWithQuote from './text-with-quote.twig';

import textWithQuoteData from './text-with-quote.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Text with Quote' };

export const Left = () => (
  <div dangerouslySetInnerHTML={{ __html: textWithQuote(textWithQuoteData) }} />
);

export const Right = () => (
  <div dangerouslySetInnerHTML={{ __html: textWithQuote({
    ...textWithQuoteData,
    text_with_quote__modifiers: ['quote-right']
    }) }} />
);

export const Both = () => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: textWithQuote(textWithQuoteData) }} />
    <div dangerouslySetInnerHTML={{ __html: textWithQuote({
      ...textWithQuoteData,
      text_with_quote__modifiers: ['quote-right']
      }) }} />
  </div>
);
