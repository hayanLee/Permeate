'use client';

import LeftArrowIcon from '@/components/Icons/Arrow/LeftArrowIcon';
import CartIcon from '@/components/Icons/CartIcon';
import HamburgerIcon from '@/components/Icons/HamburgerIcon';
import PersonIcon from '@/components/Icons/PersonIcon';
import { CART, CATEGORY, HOME, MYPAGE } from '@/constant/pathname';
import Logo from '@@/public/header/Logo.svg';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const HeaderNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const handleBackBtn = () => router.back();

  return (
    <div className="p-5 flex items-center">
      <div className="flex-1">
        {isMainPage ? (
          <Link href={CATEGORY} className="inline-block align-middle">
            <HamburgerIcon />
          </Link>
        ) : (
          <LeftArrowIcon onClick={handleBackBtn} className="cursor-pointer" />
        )}
      </div>

      <div className="grow text-center">
        <Link href={HOME}>
          <Logo className="inline-block" />
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-x-5">
        <Link href={CART}>
          <CartIcon />
        </Link>
        <Link href={MYPAGE}>
          <PersonIcon />
        </Link>
      </div>
    </div>
  );
};

export default HeaderNav;
