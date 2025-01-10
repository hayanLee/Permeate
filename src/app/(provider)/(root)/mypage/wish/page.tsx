'use client';
import ProductCard from '@/components/Card/ProductCard';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import useUserWishesQuery, { UserWish } from '@/hooks/query/mypage/useUserWishesQuery';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useState } from 'react';

const WishListPage = () => {
  const [isLatest, setIsLatest] = useState<boolean>(true);
  const handleClick = () => setIsLatest((prev) => !prev);

  const { data: wishes, isPending } = useUserWishesQuery();

  if (isPending) return <Loading />;

  return (
    <div>
      <Navbar title="찜한 상품" isHome />
      <div className="h-[140px] py-3 px-5">
        <div className="w-full h-full relative">
          <Image src={'/banner/events/event_banner_1.png'} alt="이벤트 배너 이미지" fill />
        </div>
      </div>

      <div className="px-[50px]">
        <div className="flex flex-col justify-between py-5">
          <div className="flex justify-between py-5">
            <div className="flex items-end gap-x-2">
              <h4 className="text-xl font-bold">찜한 상품</h4>
              <span className="text-muted text-base font-semibold">전체 {wishes?.length}</span>
            </div>
            <div className="flex items-center gap-x-2.5">
              <span
                className={cn('cursor-pointer, text-muted', { 'font-semibold, text-primary': isLatest })}
                onClick={handleClick}
              >
                최근 내역 순
              </span>
              |
              <span
                className={cn('cursor-pointer text-muted', { 'font-semibold, text-primary': !isLatest })}
                onClick={handleClick}
              >
                오래된 순
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-x-4 gap-y-5">
            {wishes?.map((item: UserWish) => <ProductCard product={item.Products} key={item.productId} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
