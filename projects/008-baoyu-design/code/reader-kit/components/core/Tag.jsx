import React from 'react';
export function Tag({label, tone = 'accent'}) {
  return <span className={'ds-tag ' + tone}>{label}</span>;
}
