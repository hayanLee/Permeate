import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AUTH_LOG_IN_PATHNAME } from '@/constant/pathname';
import Link from 'next/link';
function SignUpCompletePage() {
  return (
    <div>
      <Navbar title="로그인" href={AUTH_LOG_IN_PATHNAME} />

      <div className="px-12">
        <Tabs defaultValue="c">
          <TabsList className="flex">
            <TabsTrigger value="a" disabled>
              약관동의
            </TabsTrigger>
            <TabsTrigger value="b" disabled>
              계정생성
            </TabsTrigger>
            <TabsTrigger value="c">가입완료</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col items-center justify-center">
          <div className="bg-blue-200 w-[180px] h-[180px]" />

          <p>조윤정 회원님</p>
          <p>010-0000-0000</p>
          <Button asChild className="bg-blue-600 text-white mt-12 ">
            <Link href={AUTH_LOG_IN_PATHNAME}>로그인 하기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpCompletePage;
