'use client';

import { PropsWithChildren } from 'react';
import Header from '../../../_components/Header';

const ResultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="sticky top-0 z-40">
        <Header />
      </div>

      <div>{children}</div>
    </>
  );
};

export default ResultLayout;
