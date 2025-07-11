'use client';
import Input from '@/components/Input';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { AUTH_SIGN_UP_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import { Provider } from '@supabase/supabase-js';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { FormEventHandler, useRef, useState } from 'react';

export function TabContent() {
  const { logInWithProviderMutation, logInWithEmailMutation } = useAuthMutation();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleOAuthLogin = (provider: Provider) => logInWithProviderMutation(provider);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (idRef.current && pwRef.current)
      logInWithEmailMutation({ email: idRef.current.value, password: pwRef.current.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TabsContent value="member">
        <div className="w-full px-[50px]">
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              id="id"
              placeholder="아이디를 입력해주세요"
              ref={idRef}
              variant="underline"
              className="w-full"
            />
            <div className="relative w-full">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="비밀번호를 입력해주세요"
                ref={pwRef}
                variant="underline"
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Button className="mt-[50px] w-full">로그인</Button>
          </form>

          <div className="flex flex-col gap-y-3 mt-3">
            <Button
              onClick={() => handleOAuthLogin('kakao')}
              className="bg-yellow-300 text-black hover:bg-yellow-400 w-full"
            >
              카카오 로그인
            </Button>
            <Button variant="outline" onClick={() => handleOAuthLogin('google')}>
              구글 로그인
            </Button>
            <Button variant="outline" asChild>
              <Link href={AUTH_SIGN_UP_PATHNAME}>회원가입</Link>
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="guest">
        <div className="px-[50px]">
          <form className="flex flex-col gap-y-4">
            <Input id="guestId" placeholder="주문자명" variant="underline" className="w-full" />
            <Input id="orderId" placeholder="주문번호" variant="underline" className="w-full" />

            <div className="flex flex-col gap-y-3 mt-6">
              <Button disabled>주문내역 조회하기</Button>
              <Button variant="outline" asChild>
                <Link href={AUTH_SIGN_UP_PATHNAME}>회원가입</Link>
              </Button>
            </div>
          </form>
        </div>
      </TabsContent>
    </>
  );
}
