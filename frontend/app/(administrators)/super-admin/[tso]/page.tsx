'use client';
import React, { Suspense } from 'react';

import TSOPageComponent from './TSOPageComponent';

const Page = () => {

  return (
    <>
      <Suspense fallback="Loading...">
        <TSOPageComponent data={ "" } />
      </Suspense>
    </>
  );
};

export default Page;
