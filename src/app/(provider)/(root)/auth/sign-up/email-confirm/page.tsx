import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EmailConfirmPage = () => {
  return (
    <>
      <div className="flex relative p-5">
        <Link href="agreement" className="absolute">
          ⬅️
        </Link>
        <h1 className="mx-auto">이메일 인증</h1>
      </div>

      <div className="px-12">
        <div>
          <p className="py-5 border-b">인증 받을 메일 주소</p>
          <div className="py-5 flex items-center">
            <label htmlFor="email" className="w-1/4">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[40px] py-4 text-center grow"
              placeholder="이메일 주소를 입력해주세요"
            />
          </div>
          <div className="py-5 flex items-center  ">
            <label htmlFor="email" className="w-1/4">
              이메일 확인
            </label>
            <input
              type="email"
              id="email"
              className="border-b px-[40px] py-[20px] text-center grow"
              placeholder="이메일 주소를 한번 더 입력해주세요"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Button asChild className="bg-blue-600 text-white">
            <Link href="email-confirm">인증 메일 보내기</Link>
          </Button>
          <Button variant="outline" asChild className=" bg-white text-black">
            <Link href="agreement">이전</Link>
          </Button>

          <Button asChild>
            <Link href="account-form">(테스트)회원가입 폼으로 이동</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailConfirmPage;