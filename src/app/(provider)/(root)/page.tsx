'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useAuthMutation from '@/hooks/mutation/useAuthHandlers';
import Link from 'next/link';

const RootPage = () => {
  const { loggedUser } = useAuth();
  const { logOutMutation } = useAuthMutation();
  return (
    <div>
      하위~ {loggedUser?.email}
      <Button onClick={() => logOutMutation()}>로그아웃 </Button>
      <div className="flex flex-col gap-y-3">
        <Link href="user/coupon">쿠폰페이지</Link>
        <Link href="user">마이페이지</Link>
      </div>
    </div>
  );
};

export default RootPage;
