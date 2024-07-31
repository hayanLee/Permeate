'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import LogoSVG from '@@/public/logo.svg';
import XSVG from '@@/public/x.svg';
import Link from 'next/link';
import MenuItem from './MenuItem';

const SearchHeader = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header className="flex px-[20px] pl-[50px] justify-between items-center h-[64px]">
        <LogoSVG className="cursor-pointer" />
        <XSVG className="cursor-pointer" />
      </header>
      <section className="flex justify-start items-center self-stretch py-[0px] pr-[9px] pl-[50px] h-[64px]">
        <MenuItem>
          {!isLoggedIn ? <Link href={'/auth/log-in'}>로그인</Link> : <Link href={'/user'}>마이페이지</Link>}
        </MenuItem>
        <MenuItem>|</MenuItem>
        <MenuItem>
          <Link href={'/cart'}>장바구니</Link>
        </MenuItem>
      </section>
    </>
  );
};

export default SearchHeader;
