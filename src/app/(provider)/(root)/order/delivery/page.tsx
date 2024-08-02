'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useOrderMutation } from '@/hooks/mutation';
import { useOrderInfoQuery } from '@/hooks/query';
import useCart from '@/hooks/useCart';
import { cn } from '@/utils/cn';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useRef, useState } from 'react';

const DeliveryPage = () => {
  const router = useRouter();

  const { loggedUser } = useAuth();
  const { data: orderInfo } = useOrderInfoQuery();
  const { mutateAsync, isSuccess: isOrderSuccess, isError: isOrderFailed } = useOrderMutation();
  const { deleteCartItem } = useCart();

  const [selectedCoupon, setSelectedCoupon] = useState<null | any>(null);
  const [mileageAmount, setMileageAmount] = useState(0);

  const receiverMemoRef = useRef('');

  const totalDiscountedPrice = useMemo(() => {
    const productDiscountPrice = orderInfo?.productList.reduce(
      (acc: number, cur: { price: number; discountedPrice: number }) => acc + cur.price - cur.discountedPrice,
      0
    );
    const couponDiscount = selectedCoupon ? selectedCoupon.discount : 0;
    const finalDiscountedPrice = productDiscountPrice + couponDiscount + mileageAmount;
    return finalDiscountedPrice;
  }, [mileageAmount, orderInfo, selectedCoupon]);

  const totalProductPrice = useMemo(() => {
    const productPrice = orderInfo?.productList.reduce((acc: number, cur: { price: number }) => acc + cur.price, 0);
    return productPrice ?? 0;
  }, [orderInfo]);

  const totalPaymentPrice = useMemo(() => {
    const initialPrice = orderInfo?.productList.reduce(
      (acc: number, cur: { discountedPrice: number }) => acc + cur.discountedPrice,
      0
    );
    const couponPrice = selectedCoupon ? selectedCoupon.discount : 0;
    const finalPrice = initialPrice - couponPrice - mileageAmount;
    return finalPrice;
  }, [mileageAmount, orderInfo, selectedCoupon]);

  const handleChangeMileageAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > loggedUser!.userData!.mileage!) return;
    const validInputValue = e.target.value.replace(/[^0-9]/g, '');

    setMileageAmount(Number(validInputValue));
  };

  const handleOrder = async () => {
    const deliveryInfo = {
      name: orderInfo.user.name,
      address: '서울시 목업구 더미동',
      phone: orderInfo.user.phone,
      deliverMemo: receiverMemoRef.current,
      arrivalDate: new Date()
    };
    const updatedMileageAmount = orderInfo.user.mileage - mileageAmount;
    await mutateAsync({
      deliveryInfo,
      totalPrice: totalPaymentPrice,
      couponId: selectedCoupon?.couponId,
      updatedMileageAmount
    });

    await Promise.all(
      orderInfo?.productList.map((productItem: any) => deleteCartItem(productItem.productId, loggedUser!.id))
    );
    router.push('/order/complete');
  };

  return (
    <div className="relative max-w-[600px] pt-[60px] pb-[120px] w-full flex flex-col gap-5">
      <div>
        <div className="p-5 border-b-[0.5px]">
          <p className="text-xl font-bold">배송지</p>
        </div>
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-5">
            <div className="px-4 bg-[#0348FF] text-white text-sm py-1.5 rounded-full">배송지 1</div>
            <div className="px-4 text-sm py-1.5 rounded-full border border-[#B3B3B3]/50">배송지 2</div>
          </div>
          <p className="text-[#0348FF] font-bold text-sm">배송지 변경</p>
        </div>
        <div className="px-5">
          <p className="font-semibold mb-2.5">{loggedUser?.userData.name}</p>
          <p className="text-xs mb-3">{loggedUser?.userData.phone}</p>
          <p className="text-xs text-[#B3B3B3] mb-1.5">TODO: 배송지 정보 넣기</p>
          <Input
            placeholder="직접 입력하기"
            onChange={(e) => (receiverMemoRef.current = e.target.value)}
            className="border-b border-x-0 border-t-0 rounded-none placeholder:text-[B3B3B3] text-xs focus-visible:ring-0 mb-3"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center px-2.5 py-1.5 border border-[#B3B3B3] w-full text-start text-xs text-[#B3B3B3]">
              <p>TODO: 배송 시 요청사항 리스트 넣기</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem>부재 시 당근을 흔들어주세요.</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>부재 시 당근을 흔들어주세요.</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>부재 시 당근을 흔들어주세요.</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">상품정보</p>
        </div>
        <div className="flex flex-col gap-5">
          {orderInfo?.productList?.map((productItem: any) => (
            <div key={productItem.productId} className="flex items-center px-5">
              <div className="relative aspect-square max-w-[100px] mx-[33px]">
                <Image src={productItem.thumbNailURL} width={100} height={100} alt="" />
              </div>

              <div className="flex flex-col px-2.5 w-full">
                <p className="text-xs mb-1">{productItem.Brands.enName}</p>
                <p className="font-semibold mb-2.5">{productItem.title}</p>
                <p className="text-xs text-[#B3B3B3] mb-1.5">옵션 : 옵션 A / 옵션 a / 옵션 1</p>
                <div className="relative flex justify-end items-center gap-[18px]">
                  {!!productItem.discount && (
                    <>
                      <p className="absolute -top-4 right-0 text-xs text-[#B3B3B3] line-through">
                        {productItem.price.toLocaleString()}원
                      </p>
                      <p className="text-[10px] text-[#0348FF]">SALE {productItem.discount}%</p>
                    </>
                  )}
                  <p className="font-bold">
                    {productItem.discountedPrice
                      ? productItem.discountedPrice.toLocaleString()
                      : productItem.price.toLocaleString()}
                    원
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">마일리지 사용</p>
        </div>
        <div className="flex flex-col text-xl px-5">
          <div className="flex justify-between items-center py-2.5">
            <p>보유</p>
            <p className="text-[#B3B3B3]">
              <span className="text-base pr-2">사용 가능한 마일리지 잔액</span>
              {loggedUser?.userData.mileage?.toLocaleString()}P
            </p>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <p>사용 금액</p>
            <div className="flex items-center gap-6">
              <Input
                value={mileageAmount}
                onChange={handleChangeMileageAmount}
                className="max-w-[353px] h-9 py-1.5 text-xl font-bold text-[#0348FF] text-right"
              />
              <p className="font-bold">P</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">쿠폰 사용</p>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="coupon_list" className="border-none">
            <div className="flex justify-between items-center py-2.5 text-xl px-5 data-[state=open]:hidden mb-5">
              <p>보유</p>
              <AccordionTrigger withChevron={false} className="text-xs px-5 py-1.5 bg-[#0348FF] text-white rounded-sm">
                사용 가능한 쿠폰 확인하기
              </AccordionTrigger>
            </div>
            <AccordionContent className="bg-[#D9D9D9] py-[30px] flex flex-col gap-3.5">
              {orderInfo?.coupon.map((couponItem: any) => {
                const formattedIssueDate = dayjs(couponItem.issueDate).format('YYYY-MM-DD');
                const formattedExpirationDate = dayjs(couponItem.expirationDate).format('YYYY-MM-DD');
                if (couponItem.status === 'active')
                  return (
                    <div
                      key={couponItem.couponId}
                      onClick={() => setSelectedCoupon(couponItem)}
                      className={cn(
                        'px-10 py-[26px] rounded-sm shadow-[140px_52px_42px_0px_rgba(0,0,0,0.00),90px_34px_38px_0px_rgba(0,0,0,0.01),50px_19px_32px_0px_rgba(0,0,0,0.03),22px_8px_24px_0px_rgba(0,0,0,0.04),6px_2px_13px_0px_rgba(0,0,0,0.05)] transition-all',
                        couponItem === selectedCoupon ? 'bg-[#0348FF] text-white' : 'bg-white text-black'
                      )}
                    >
                      <p className="pb-2.5 text-base font-semibold">{couponItem.name}</p>
                      <p
                        className={cn('pb-2 text-xs', couponItem === selectedCoupon ? 'text-white' : 'text-[#B3B3B3]')}
                      >
                        {formattedIssueDate} - {formattedExpirationDate}
                      </p>
                      <p
                        className={cn(
                          'pb-2 text-[20px] font-bold',
                          couponItem === selectedCoupon ? 'text-white' : 'text-[#0348FF]'
                        )}
                      >
                        {couponItem.discount.toLocaleString()}원
                      </p>
                      <div className="flex justify-between items-center">
                        <p className={cn('text-xs', couponItem === selectedCoupon ? 'text-white' : 'text-[#0348FF]')}>
                          -{couponItem.discount.toLocaleString()}원 할인 혜택
                        </p>
                        <button
                          className={cn(
                            'text-xs py-1.5 px-2.5 rounded-sm',
                            couponItem === selectedCoupon ? 'bg-white text-[#0348FF]' : 'bg-[#0348FF] text-white'
                          )}
                        >
                          적용하기
                        </button>
                      </div>
                    </div>
                  );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">결제 수단</p>
        </div>
        <div className="flex items-center px-5 gap-4">
          <Checkbox />
          <p>토스페이</p>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="refund" className="border-b-[0.5px]">
          <AccordionTrigger withChevron={false} className="flex justify-between p-5 [&[data-state=open]>svg]:rotate-0">
            <p className="text-xl font-bold">환불 방법</p>
            <svg
              className="rotate-180 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="9"
              viewBox="0 0 18 9"
              fill="none"
            >
              <path d="M17 8.05469L9.00002 0.943577L1 8.05469" stroke="#302A28" stroke-miterlimit="10" />
            </svg>
          </AccordionTrigger>
          <AccordionContent className="text-[10px] bg-[#B3B3B3] p-6">
            <p>선택하신 결제 방법으로 환불해 드립니다.</p>
            <ul className="list-disc list-inside">
              <li>
                입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. 이에 품절 시 빠르게 환불 처리해드립니다.
              </li>
              <li>
                현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다. 은행명, 계좌번호, 예금주명을 정확히 기재
                부탁드립니다.
              </li>
              <li>환불받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불 처리됩니다.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">최종 결제 금액</p>
        </div>
        <div className="flex flex-col px-5 mb-5">
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p>상품금액</p>
            <p className="font-medium">{totalProductPrice.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p>배송비</p>
            <p className="font-medium text-[#0348FF]">배송비 무료</p>
          </div>
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p>할인금액</p>
            <p className="font-medium text-[#0348FF]">
              <span className="text-base">SAVE</span> -{totalDiscountedPrice.toLocaleString()}원
            </p>
          </div>
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p className="font-bold">결제금액</p>
            <p className="font-medium">{totalPaymentPrice.toLocaleString()}원</p>
          </div>
        </div>
        <div className="flex justify-between items-center px-5">
          <p className="text-xs">주문 내용을 확인했으며 서비스 약관 및 결제에 동의합니다.</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
            <path d="M1 0.945312L8.99998 8.05642L17 0.945313" stroke="black" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>

      <div className="fixed bottom-0 h-[96px] flex flex-col items-center z-50 max-w-[598px] w-full bg-white shadow-[0px_-19px_5px_0px_rgba(0,0,0,0.00),0px_-12px_5px_0px_rgba(0,0,0,0.01),0px_-7px_4px_0px_rgba(0,0,0,0.05),0px_-3px_3px_0px_rgba(0,0,0,0.09),0px_-1px_2px_0px_rgba(0,0,0,0.10)]">
        <div className="flex justify-center items-center h-full">
          <button onClick={handleOrder} className="bg-[#0348FF] text-white px-5 py-[11.5px] rounded-sm">
            총 {orderInfo?.productList?.length}개 | {totalPaymentPrice.toLocaleString()}원 구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
