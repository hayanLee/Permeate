import { PageHeader } from '@/components/Navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Banner from '@@/public/banner/tempBanner.svg';
import { TabContent } from './TabContent';

export default function LogInPage() {
  return (
    <>
      <div className="flex flex-col grow">
        <PageHeader title="로그인" />
        <Tabs defaultValue="member" className="px-[50px]">
          <TabsList className="flex w-full">
            <TabsTrigger value="member" className="flex-1">
              가입 회원
            </TabsTrigger>
            <TabsTrigger value="guest" className="flex-1">
              비회원 주문 조회
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabContent />
          </div>
        </Tabs>
      </div>
      <Banner className="mx-auto my-4" />
    </>
  );
}
