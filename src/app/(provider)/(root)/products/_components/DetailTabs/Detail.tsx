'use client';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import Image from 'next/image';
import { useState } from 'react';

const DetailPage = ({ productDetail }: { productDetail: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleOnOff = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <div className={`transition-all duration-500 ${!isExpanded ? 'max-h-[243px] overflow-hidden' : 'h-auto'}`}>
        <div className="relative w-full mb-5">
          <Image
            src={productDetail}
            alt={'상세 정보'}
            width={1000}
            height={1000}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full absolute bottom-0 left-0 flex items-center mb-5 justify-center bg-opacity-75">
        <button className="bg-white p-2.5 border flex items-center gap-2" onClick={handleOnOff}>
          상품 정보
          <span className="flex gap-2 items-center">
            {isExpanded ? (
              <>
                접기
                <ArrowIcon className="rotate-90" height={15} />
              </>
            ) : (
              <>
                더보기
                <ArrowIcon className="-rotate-90" height={15} />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
