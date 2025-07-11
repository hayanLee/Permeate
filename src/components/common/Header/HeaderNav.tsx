import { Button } from '@/components/ui/button';
import { AUTH_LOG_IN_PATHNAME, CART, CATEGORY, HOME, MYPAGE } from '@/constant/pathname';
import { createClient } from '@/supabase/server';
import Logo from '@@/public/header/Logo.svg';
import { LogIn, Menu, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import { BackButton } from './BackButton';

interface HeaderNavProps {
  isBackBtn?: boolean;
}

const HeaderNav = async ({ isBackBtn = false }: HeaderNavProps) => {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();
  const isLoggedIn = !!authData.user;

  return (
    <div className="p-4 grid grid-cols-3 items-center bg-white">
      <Button variant="ghost" size="icon" asChild>
        {isBackBtn ? (
          <BackButton />
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
        {isLoggedIn ? (
          <>
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
          </>
        ) : (
          <Button variant="ghost" size="icon" asChild>
            <Link href={AUTH_LOG_IN_PATHNAME}>
              <LogIn />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
