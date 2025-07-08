import { PageHeader } from '@/components/Navigation';
import Link from 'next/link';

const OrderError = () => {
  return (
    <>
      <PageHeader title="주문실패" showHomeButton />

      <div className="max-w-[600px] h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <div className="h-full flex flex-col justify-center items-center gap-9">
          <p className="text-[20px] font-bold">주문에 실패하였습니다.</p>
          <Link href="/cart">장바구니로 돌아가기</Link>
        </div>
      </div>
    </>
  );
};

export default OrderError;
