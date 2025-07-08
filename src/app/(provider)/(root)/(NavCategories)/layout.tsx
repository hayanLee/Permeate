'use client';

import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import HeaderNav from '../../../../components/common/Header/HeaderNav';

const NavCategoriesLayout = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="sticky top-0 z-10">
        <HeaderNav isBackBtn />
      </div>
      {children}
    </>
  );
};

export default NavCategoriesLayout;
