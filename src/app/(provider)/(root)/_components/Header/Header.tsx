'use client';

import { useAuthMutation } from '@/hooks/mutation';
import Link from 'next/link';

const Header = () => {
  const { logOutMutation } = useAuthMutation();
  return (
    <div>
      <Link href="/">홈</Link>
      <Link href="/auth/log-in">로그인</Link>
      <button onClick={logOutMutation}>로그아웃</button>
      <Link href="/auth/sign-up">회원가입</Link>
      <Link href="/search">검색</Link>
      <Link href="/cart">장바구니</Link>
    </div>
  );
};

export default Header;
