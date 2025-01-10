'use client';

import CartIcon from '@/components/Icons/CartIcon';
import { Button } from '@/components/ui/button';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import Link from 'next/link';

const CartEmpty = () => {
  const { data: loggedUser } = useAuthQuery();

  return (
    <div className="h-[calc(100vh-70px)] relative flex flex-col gap-9 items-center justify-center">
      <CartIcon stroke="#B3B3B3" width="79" height="91" />

      <div className="text-center text-xl text-[#B3B3B3]">
        <p>장바구니에 상품이 없습니다.</p>
        <p>상품을 추가해보세요.</p>
      </div>

      <Button asChild>
        <Link href={loggedUser ? 'mypage/wish' : '/auth/log-in'}>좋아요한 상품 보러 가기</Link>
      </Button>

      <Button asChild className="absolute bottom-0 w-[calc(100%-20px)]">
        <Link href="/">쇼핑 계속하기</Link>
      </Button>
    </div>
  );
};

export default CartEmpty;
