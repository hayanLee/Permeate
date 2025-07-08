'use client';

import { usePathname } from 'next/navigation';
import HeaderWrapper from './HeaderWrapper';

const PathAwareHeader = () => {
  const pathname = usePathname();

  return (
    <>
      <HeaderWrapper pathname={pathname} />
    </>
  );
};

export default PathAwareHeader;
