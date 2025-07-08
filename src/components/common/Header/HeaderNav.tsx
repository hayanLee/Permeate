'use client';

import { Button } from '@/components/ui/button';
import { CART, CATEGORY, HOME, MYPAGE } from '@/constant/pathname';
import Logo from '@@/public/header/Logo.svg';
import { ArrowLeft, Menu, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderNavProps {
  isBackBtn?: boolean;
}

const HeaderNav = ({ isBackBtn = false }: HeaderNavProps) => {
  const router = useRouter();
  const handleBackBtn = () => router.back();

  return (
    <div className="p-4 grid grid-cols-3 items-center bg-white">
      <Button variant="ghost" size="icon" asChild>
        {isBackBtn ? (
          <ArrowLeft onClick={handleBackBtn} className="cursor-pointer" />
        ) : (
          <Link href={CATEGORY}>
            <Menu />
          </Link>
        )}
      </Button>

      <div className="text-center">
        <Link href={HOME}>
          <Logo className="inline-block" />
        </Link>
      </div>

      <div className="flex justify-end items-center gap-x-2">
        <div></div>
        <Button variant="ghost" size="icon" asChild>
          <Link href={CART}>
            <ShoppingCart />
          </Link>
        </Button>

        <Button variant="ghost" size="icon" asChild>
          <Link href={MYPAGE}>
            <UserRound />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderNav;
