'use client';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import { cx } from 'class-variance-authority';
import { useState } from 'react';
const DeliveryOptions = () => {
  const deliveryOptions = [
    '배송 상품 50,000원 이상 구매시 무료배송',
    '배송 상품 30,000원 이상 구매시 배송비 1,500원',
    '배송 상품 10,000원 이상 구매시 배송비 2,500원',
    '카카오 페이로 구매 시 무료배송',
    '토스 페이로 구매 시 무료배송'
  ];
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleOnOff = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <div className="box-container">
        <span className="text-[#B3B3B3] font-bold">상품 배송 옵션</span>
        {deliveryOptions.length > 3 && (
          <span className="flex items-center text-[#B3B3B3] hover:cursor-pointer gap-2" onClick={handleOnOff}>
            배송 혜택 모두 보기
            {isExpanded ? (
              <ArrowIcon className="-rotate-90" color="#B3B3B3" height={10} />
            ) : (
              <ArrowIcon className="rotate-180" color="#B3B3B3" height={10} />
            )}
          </span>
        )}
      </div>

      <div
        className={cx(
          'grid-col-3 gap-[10px] justify-between p-5-2 w-full overflow-hidden flex-wrap transition-all duration-500',
          { 'h-[120px]': !isExpanded, 'h-auto': isExpanded }
        )}
      >
        {deliveryOptions.map((deliveryOption, index) => (
          <div key={index} className="bg-gray-100 rounded-sm pt-[18px] pr-[14px] pb-[17px] pl-[15px]">
            <span className="font-bold text-[15px] leading-[22.5px]">{deliveryOption}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
