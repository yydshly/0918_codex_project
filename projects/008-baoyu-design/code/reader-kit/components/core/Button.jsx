import React from 'react';
export function Button({label, variant = 'primary', disabled = false, onClick}) {
  return <button type="button" className={'ds-button ' + variant} disabled={disabled} onClick={onClick}>{label}</button>;
}
