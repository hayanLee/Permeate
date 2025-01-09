'use client';

import { CART, CATEGORY, HOME, MYPAGE } from '@/constant/pathname';
import Arrow from '@@/public/arrow/arrow-left.svg';
import BasketSVG from '@@/public/header/basket.svg';
import MenubarSVG from '@@/public/header/header_menubar.svg';
import Logo from '@@/public/header/Logo.svg';
import PersonSVG from '@@/public/header/person.svg';
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
            <MenubarSVG />
          </Link>
        ) : (
          <Arrow onClick={handleBackBtn} className="cursor-pointer" />
        )}
      </div>

      <div className="grow text-center">
        <Link href={HOME}>
          <Logo className="inline-block" />
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-x-5">
        <Link href={CART}>
          <BasketSVG />
        </Link>
        <Link href={MYPAGE}>
          <PersonSVG />
        </Link>
      </div>
    </div>
  );
};

export default HeaderNav;
