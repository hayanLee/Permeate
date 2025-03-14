'use client';

import { kakaoPayment, tossPayment } from '@/api/payment';
import Navbar from '@/components/Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MYPAGE_ADDRESS_EDIT_PATHNAME } from '@/constant/pathname';
import { useOrderMutation } from '@/hooks/mutation';
import { useOrderInfoQuery } from '@/hooks/query';
import useAddressQuery from '@/hooks/query/useAddressQuery';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import useCart from '@/hooks/useCart';
import { Tables } from '@/types/supabase';
import { cn } from '@/utils/cn';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { OrderCompleted, OrderError, OrderLoading } from './_components';

const DeliveryPage = () => {
  const router = useRouter();

  const { data: loggedUser } = useAuthQuery();
  const { mutateAsync } = useOrderMutation();
  const { deleteCartItem } = useCart();
  const { data: addressList, isFetched } = useAddressQuery();

  const [selectedCoupon, setSelectedCoupon] = useState<null | any>(null);
  const [selectedPayment, setSelectedPayment] = useState<'TOSS' | 'KAKAOPAY'>('KAKAOPAY');
  const [selectedAddress, setSelectedAddress] = useState<Tables<'Addresses'> | null>(null);
  const [receiverMemo, setReceiverMemo] = useState('문 앞에 놓아주세요.');
  const [mileageAmount, setMileageAmount] = useState(0);
  const [orderStatus, setOrderStatus] = useState<'IDLE' | 'PENDING' | 'COMPLETED' | 'FAILED'>('IDLE');

  const buyNowItem = useMemo(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('buy-now');
      if (item) {
        const parsedItem = JSON.parse(item);
        return parsedItem;
      }
    }
  }, []);

  const { data: orderInfo } = useOrderInfoQuery(!buyNowItem && orderStatus === 'IDLE');

  const availableCoupons = useMemo(() => {
    return (
      orderInfo?.coupon.filter((couponItem: any) => {
        couponItem.status === 'active';
      }) ?? []
    );
  }, [orderInfo?.coupon]);

  const totalProductDiscountPrice = useMemo(
    () =>
      orderInfo?.productList.reduce(
        (acc: number, cur: { price: number; discountedPrice: number }) => acc + cur.price - cur.discountedPrice,
        0
      ),
    [orderInfo]
  );

  const totalDiscountedPrice = useMemo(() => {
    const productDiscountPrice = totalProductDiscountPrice;
    const couponDiscount = selectedCoupon ? selectedCoupon.discount : 0;
    const finalDiscountedPrice = productDiscountPrice + couponDiscount + mileageAmount;
    return finalDiscountedPrice;
  }, [mileageAmount, selectedCoupon, totalProductDiscountPrice]);

  const totalProductPrice = useMemo(() => {
    const productPrice = orderInfo?.productList.reduce(
      (acc: number, cur: { price: number; count: number }) => acc + cur.price * cur.count,
      0
    );
    return productPrice ?? 0;
  }, [orderInfo]);

  const totalPaymentPrice = useMemo(() => {
    const initialPrice = orderInfo?.productList.reduce(
      (acc: number, cur: { discountedPrice: number; count: number }) => acc + cur.discountedPrice * cur.count,
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

  const handleSelectPayment = (payment: 'TOSS' | 'KAKAOPAY') => {
    setSelectedPayment(payment);
  };

  const handleSelectCoupon = (coupon: any) => {
    if (selectedCoupon === coupon) return setSelectedCoupon(null);

    setSelectedCoupon(coupon);
  };

  const handleOrder = async () => {
    if (!selectedAddress) return alert('배송지를 선택해주세요!');

    setOrderStatus('PENDING');
    let response;
    const orderName = buyNowItem
      ? buyNowItem.title
      : orderInfo.productList.length > 1
        ? `${orderInfo.productList[0].title} 외 ${orderInfo.productList.length - 1}건`
        : orderInfo.productList[0].title;
    switch (selectedPayment) {
      case 'TOSS':
        const tossResponse = await tossPayment(
          orderName,
          buyNowItem ? (buyNowItem.discountedPrice ?? buyNowItem.price) : totalPaymentPrice
        );
        response = tossResponse;
        if (response?.code != null) {
          alert(response.message);
          localStorage.removeItem('buy-now');
          setOrderStatus('FAILED');
          return;
        }
        break;
      case 'KAKAOPAY':
        const kakaoResponse = await kakaoPayment(
          orderName,
          buyNowItem ? (buyNowItem.discountedPrice ?? buyNowItem.price) : totalPaymentPrice
        );
        response = kakaoResponse;
        if (response?.code != null) {
          alert(response.message);
          localStorage.removeItem('buy-now');
          setOrderStatus('FAILED');
          return;
        }
        break;
    }

    const deliveryInfo = {
      name: selectedAddress?.name!,
      addressId: selectedAddress?.addressId!,
      phone: selectedAddress?.phone!,
      deliverMemo: receiverMemo,
      arrivalDate: new Date()
    };

    const updatedMileageAmount = loggedUser?.userData.mileage! - mileageAmount;

    const mutateResponse = await mutateAsync({
      orderId: response?.paymentId!,
      deliveryInfo,
      totalPrice: buyNowItem ? (buyNowItem.discountedPrice ?? buyNowItem.price) : totalPaymentPrice,
      couponId: selectedCoupon?.couponId,
      updatedMileageAmount,
      payment: selectedPayment,
      productIdList: buyNowItem
        ? [buyNowItem.productId]
        : orderInfo.productList.map((v: { productId: number }) => v.productId)
    });

    if (!mutateResponse.ok) {
      localStorage.removeItem('buy-now');
      return setOrderStatus('FAILED');
    }

    if (!buyNowItem) {
      await Promise.all(
        orderInfo?.productList.map((productItem: any) => deleteCartItem(productItem.productId, loggedUser!.id))
      );
    }

    localStorage.removeItem('cart');
    localStorage.removeItem('buy-now');
    setOrderStatus('COMPLETED');
  };

  useEffect(() => {
    if (isFetched && addressList?.length) {
      setSelectedAddress(addressList[0]);
    }

    return () => {
      localStorage.removeItem('buy-now');
    };
  }, [addressList, isFetched]);

  if (orderStatus === 'IDLE') {
    return (
      <>
        <Navbar title="배송지" isHome />
        <div className="relative max-w-[600px] pt-[60px] pb-[120px] w-full flex flex-col gap-5">
          <div>
            <div className="p-5 border-b-[0.5px]">
              <p className="text-xl font-bold">배송지</p>
            </div>
            <div className="flex justify-between items-center px-5 py-4">
              <div className="flex items-center gap-5 text-nowrap w-5/6 overflow-x-scroll">
                {addressList?.length ? (
                  addressList?.map((addressItem) => (
                    <button
                      onClick={() => setSelectedAddress(addressItem)}
                      key={addressItem.addressId}
                      className={cn(
                        selectedAddress === addressItem
                          ? 'bg-[#0348FF] text-white border-[#FFFFFF]/50'
                          : 'bg-white text-[#302A28] border-[#B3B3B3]/50',
                        'px-4 text-sm py-1.5 rounded-full border transition-all'
                      )}
                    >
                      {addressItem.name}
                    </button>
                  ))
                ) : (
                  <>
                    <p>등록된 배송지가 없습니다.</p>
                    <Link href={MYPAGE_ADDRESS_EDIT_PATHNAME} className="text-[#0348FF] font-bold text-sm">
                      배송지를 등록해주세요!
                    </Link>
                  </>
                )}
              </div>
              <Link href={MYPAGE_ADDRESS_EDIT_PATHNAME} className="text-[#0348FF] font-bold text-sm">
                배송지 변경
              </Link>
            </div>
            <div className="px-5">
              <p className="font-semibold mb-2.5">{selectedAddress?.name}</p>
              <p className="text-xs mb-3">{selectedAddress?.phone}</p>
              <p className="text-xs text-[#B3B3B3] mb-1.5">
                {selectedAddress?.address} {selectedAddress?.detailAddress}
              </p>
              {/* <Input
                placeholder="직접 입력하기"
                onChange={(e) => setReceiverMemo(e.target.value)}
                className="border-b border-x-0 border-t-0 rounded-none placeholder:text-[B3B3B3] text-xs focus-visible:ring-0 mb-3"
              /> */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-between items-center px-2.5 py-1.5 border border-[#B3B3B3] w-full text-start text-xs text-[#B3B3B3]">
                  <p>{receiverMemo ? receiverMemo : '배송시 요청사항을 선택해주세요.'}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                    <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem onClick={() => setReceiverMemo('문 앞에 놓아주세요.')}>
                    문 앞에 놓아주세요.
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem onClick={() => setReceiverMemo('부재시 당근을 흔들어주세요.')}>
                    부재시 당근을 흔들어주세요.
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem onClick={() => setReceiverMemo('부재시 경비실에 맡겨주세요.')}>
                    부재시 경비실에 맡겨주세요.
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <div className="p-5 border-b-[0.5px] mb-5">
              <p className="text-xl font-bold">상품정보</p>
            </div>
            <div className="flex flex-col gap-5">
              {buyNowItem ? (
                <div className="flex items-center px-5">
                  <div className="relative aspect-square max-w-[100px] mx-[33px]">
                    <Image src={buyNowItem.thumbNailURL} width={100} height={100} alt="" />
                  </div>

                  <div className="flex flex-col px-2.5 w-full">
                    <p className="text-xs mb-1">{buyNowItem.Brand.enName}</p>
                    <p className="font-semibold mb-2.5">{buyNowItem.title}</p>
                    <p className="text-xs text-[#B3B3B3] mb-1.5">
                      옵션 : {buyNowItem.volume}, {buyNowItem.count}개
                    </p>
                    <div className="relative flex justify-end items-center gap-[18px]">
                      {!!buyNowItem.discount && (
                        <>
                          <p className="absolute -top-4 right-0 text-xs text-[#B3B3B3] line-through">
                            {buyNowItem.price.toLocaleString()}원
                          </p>
                          <p className="text-[10px] text-[#0348FF]">SALE {buyNowItem.discount}%</p>
                        </>
                      )}
                      <p className="font-bold">
                        {buyNowItem.discountedPrice
                          ? buyNowItem.discountedPrice.toLocaleString()
                          : buyNowItem.price.toLocaleString()}
                        원
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                orderInfo?.productList?.map((productItem: any) => (
                  <div key={productItem.productId} className="flex items-center px-5">
                    <div className="relative aspect-square max-w-[100px] mx-[33px]">
                      <Image src={productItem.thumbNailURL} width={100} height={100} alt="" />
                    </div>

                    <div className="flex flex-col px-2.5 w-full">
                      <p className="text-xs mb-1">{productItem.Brands.enName}</p>
                      <p className="font-semibold mb-2.5">{productItem.title}</p>
                      <p className="text-xs text-[#B3B3B3] mb-1.5">
                        옵션 : {productItem.volume}, {productItem.count}개
                      </p>
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
                ))
              )}
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
                  <AccordionTrigger
                    withChevron={false}
                    className="text-xs px-5 py-1.5 bg-[#0348FF] text-white rounded-sm"
                  >
                    사용 가능한 쿠폰 확인하기
                  </AccordionTrigger>
                </div>
                <AccordionContent className="bg-[#D9D9D9] py-[30px] flex flex-col gap-3.5">
                  {availableCoupons.length ? (
                    orderInfo?.coupon.map((couponItem: any) => {
                      const formattedIssueDate = dayjs(couponItem.issueDate).format('YYYY-MM-DD');
                      const formattedExpirationDate = dayjs(couponItem.expirationDate).format('YYYY-MM-DD');
                      if (couponItem.orderStatus === 'active')
                        return (
                          <div
                            key={couponItem.couponId}
                            onClick={() => handleSelectCoupon(couponItem)}
                            className={cn(
                              'px-10 py-[26px] rounded-sm shadow-[140px_52px_42px_0px_rgba(0,0,0,0.00),90px_34px_38px_0px_rgba(0,0,0,0.01),50px_19px_32px_0px_rgba(0,0,0,0.03),22px_8px_24px_0px_rgba(0,0,0,0.04),6px_2px_13px_0px_rgba(0,0,0,0.05)] transition-all',
                              couponItem === selectedCoupon ? 'bg-[#0348FF] text-white' : 'bg-white text-black'
                            )}
                          >
                            <p className="pb-2.5 text-base font-semibold">{couponItem.name}</p>
                            <p
                              className={cn(
                                'pb-2 text-xs',
                                couponItem === selectedCoupon ? 'text-white' : 'text-[#B3B3B3]'
                              )}
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
                              <p
                                className={cn(
                                  'text-xs',
                                  couponItem === selectedCoupon ? 'text-white' : 'text-[#0348FF]'
                                )}
                              >
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
                    })
                  ) : (
                    <p className="text-[20px] text-white text-center py-5">지금 사용 가능한 쿠폰이 없습니다.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <div className="p-5 border-b-[0.5px]">
              <p className="text-xl font-bold">결제 수단</p>
            </div>
            <div
              onClick={() => handleSelectPayment('KAKAOPAY')}
              className="flex items-center gap-4 p-5 text-[20px] cursor-pointer"
            >
              <Checkbox
                checked={selectedPayment === 'KAKAOPAY'}
                className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white data-[state=checked]:border-none"
              />
              <div className="w-20 h-10 relative">
                <Image src={'/logo/kakaopay.png'} alt="카카오페이 로고" fill className="p-2" />
              </div>
              <p>카카오페이</p>
            </div>
            <div
              onClick={() => handleSelectPayment('TOSS')}
              className="flex items-center gap-4 p-5 text-[20px] cursor-pointer"
            >
              <Checkbox
                checked={selectedPayment === 'TOSS'}
                className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white data-[state=checked]:border-none transition-colors"
              />
              <div className="w-20 h-10 relative">
                <Image src="/logo/toss.png" alt="토스페이 로고" fill />
              </div>
              <p>토스페이</p>
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="refund" className="border-b-[0.5px]">
              <AccordionTrigger
                withChevron={false}
                className="flex justify-between p-5 [&[data-state=open]>svg]:rotate-0"
              >
                <p className="text-xl font-bold">환불 방법</p>
                <svg
                  className="rotate-180 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="9"
                  viewBox="0 0 18 9"
                  fill="none"
                >
                  <path d="M17 8.05469L9.00002 0.943577L1 8.05469" stroke="#302A28" strokeMiterlimit="10" />
                </svg>
              </AccordionTrigger>
              <AccordionContent className="text-[10px] bg-[#B3B3B3] p-6">
                <p>선택하신 결제 방법으로 환불해 드립니다.</p>
                <ul className="list-disc list-inside">
                  <li>
                    입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. 이에 품절 시 빠르게 환불
                    처리해드립니다.
                  </li>
                  <li>
                    현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다. 은행명, 계좌번호, 예금주명을 정확히
                    기재 부탁드립니다.
                  </li>
                  <li>
                    환불받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불 처리됩니다.
                  </li>
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
                <p className="font-medium">
                  {buyNowItem
                    ? buyNowItem.discountedPrice
                      ? (buyNowItem.discountedPrice * buyNowItem.count).toLocaleString()
                      : (buyNowItem.price * buyNowItem.count).toLocaleString()
                    : totalProductPrice.toLocaleString()}
                  원
                </p>
              </div>
              <div className="flex justify-between items-center py-2.5 text-xl">
                <p>배송비</p>
                <p className="font-medium text-[#0348FF]">배송비 무료</p>
              </div>
              {buyNowItem?.discountedPrice || totalDiscountedPrice ? (
                <div className="flex flex-col py-2.5 text-xl">
                  <div className="flex justify-between items-center py-5">
                    <p>할인금액</p>
                    <p className="font-medium text-[#0348FF]">
                      <span className="text-base">SAVE</span> -
                      {buyNowItem
                        ? buyNowItem.discountedPrice
                          ? (buyNowItem.price - buyNowItem.discountedPrice).toLocaleString()
                          : 0
                        : totalDiscountedPrice.toLocaleString()}
                      원
                    </p>
                  </div>
                  <div className="text-xs flex items-center justify-between px-[30px] py-4">
                    <p>쿠폰 할인금액</p>
                    <p>-{selectedCoupon ? selectedCoupon.discount.toLocaleString() : 0}원</p>
                  </div>
                  {buyNowItem?.discountedPrice || totalProductDiscountPrice ? (
                    <div className="text-xs flex items-center justify-between px-[30px] py-4">
                      <p>행사 할인금액</p>
                      <p>
                        -
                        {buyNowItem?.discountedPrice
                          ? (buyNowItem.price - buyNowItem.discountedPrice).toLocaleString()
                          : totalProductDiscountPrice.toLocaleString()}
                        원
                      </p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
              <div className="flex items-center justify-between py-2.5 text-xl">
                <p className="font-bold">결제금액</p>
                <p className="font-medium">
                  {buyNowItem?.discountedPrice
                    ? buyNowItem.discountedPrice.toLocaleString()
                    : (buyNowItem?.price.toLocaleString() ?? totalPaymentPrice.toLocaleString())}
                  원
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center px-5">
              <p className="text-xs">주문 내용을 확인했으며 서비스 약관 및 결제에 동의합니다.</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                <path d="M1 0.945312L8.99998 8.05642L17 0.945313" stroke="black" strokeMiterlimit="10" />
              </svg>
            </div>
          </div>

          <div className="fixed bottom-0 h-[96px] flex flex-col items-center z-50 max-w-[500px] w-full bg-white shadow-[0px_-19px_5px_0px_rgba(0,0,0,0.00),0px_-12px_5px_0px_rgba(0,0,0,0.01),0px_-7px_4px_0px_rgba(0,0,0,0.05),0px_-3px_3px_0px_rgba(0,0,0,0.09),0px_-1px_2px_0px_rgba(0,0,0,0.10)]">
            <div className="flex justify-center items-center h-full">
              <button onClick={handleOrder} className="bg-[#0348FF] text-white px-5 py-[11.5px] rounded-sm">
                총 {buyNowItem ? 1 : (orderInfo?.productList?.length ?? 0)}개 |{' '}
                {buyNowItem?.discountedPrice
                  ? buyNowItem.discountedPrice.toLocaleString()
                  : (buyNowItem?.price.toLocaleString() ?? totalPaymentPrice)
                    ? totalPaymentPrice.toLocaleString()
                    : 0}
                원 구매하기
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (orderStatus === 'PENDING') {
    return <OrderLoading />;
  }

  if (orderStatus === 'COMPLETED') {
    return <OrderCompleted />;
  }

  if (orderStatus === 'FAILED') {
    return <OrderError />;
  }
};

export default DeliveryPage;
