'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { SafeHydrate } from '@/util/safeh';

const inter = Inter({subsets: ['latin']});



export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    </head>
    <body className={inter.className}>
    <SafeHydrate>{children}</SafeHydrate>
    </body>
    </html>
  );
}
