'use client';
import { useAuth } from '@/contexts/auth.context/auth.context';
import Link from 'next/link';

const SignUpPage = () => {
  const { logInWithProvider } = useAuth();

  const handleLogin = () => logInWithProvider('kakao');
  return (
    <div>
      <Link href="/log-in" className="text-2xl">
        ⬅️
      </Link>
      <div className="flex flex-col gap-y-5">
        <div className="border w-full h-14 bg-slate-200">해택</div>
        <div className="border w-full h-14 bg-slate-200">해택</div>
        <div className="border w-full h-14 bg-slate-200">해택</div>
      </div>

      <button className="border bg-yellow-200" onClick={handleLogin}>
        카카오로 회원가입
      </button>
    </div>
  );
};

export default SignUpPage;
