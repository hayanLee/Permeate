import CartIcon from '@/components/Icons/CartIcon';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MYPAGE_ORDERS_PATHNAME } from '@/constant/pathname';
import Link from 'next/link';

const OrderCompleted = () => {
  return (
    <>
      <Navbar title="주문완료" isHome />

      <div className="max-w-[600px] h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <div className="h-full flex flex-col justify-center items-center gap-9">
          <CartIcon size={80} color="#0348FF" />
          <p className="text-[20px] text-[#0348FF] font-bold">주문이 완료되었습니다.</p>
        </div>
        <div className="flex flex-col gap-6 w-full px-5 mt-auto mb-4">
          <Button asChild variant="outline" className="h-[46px] m-0">
            <Link href={MYPAGE_ORDERS_PATHNAME}>지난 주문 확인하기</Link>
          </Button>
          <Button asChild className="bg-[#0348FF] h-[46px] m-0">
            <Link href="/">쇼핑 계속하기</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderCompleted;
