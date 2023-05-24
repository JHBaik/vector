import React from 'react';

export function SafeHydrate({children}: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {(typeof window === 'undefined') ? null : children}
    </div>
  );
}
