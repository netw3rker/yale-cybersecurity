import React from 'react';

import alert from './alert.twig';

import alertData from './alert.yml';

import './alert';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules|Alert' };

export const Persistent = () => (
  <div dangerouslySetInnerHTML={{ __html: alert(alertData) }} />
);
export const Notice = () => (
  <div dangerouslySetInnerHTML={{ __html: alert({
    ...alertData,
    alert__modifiers: ['notice']
  }) }} />
);
export const Warning = () => (
  <div dangerouslySetInnerHTML={{ __html: alert({
    ...alertData,
    alert__modifiers: ['warning']
  }) }} />
);
export const Danger = () => (
  <div dangerouslySetInnerHTML={{ __html: alert({
    ...alertData,
    alert__modifiers: ['danger']
  }) }} />
);

