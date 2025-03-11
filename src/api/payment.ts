import * as PortOne from '@portone/browser-sdk/v2';

export const tossPayment = async (orderName: string, totalAmount: number) => {
  const response = await PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_KEY!,
    channelKey: process.env.NEXT_PUBLIC_PORTONE_TOSS_CHANNEL_KEY,
    paymentId: crypto.randomUUID(),
    orderName,
    totalAmount,
    currency: 'CURRENCY_KRW',
    payMethod: 'EASY_PAY'
  });

  return response;
};

export const kakaoPayment = async (orderName: string, totalAmount: number) => {
  const response = await PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_KEY!,
    channelKey: process.env.NEXT_PUBLIC_PORTONE_KAKAOCHANNEL_KEY,
    paymentId: crypto.randomUUID(),
    orderName,
    totalAmount,
    currency: 'CURRENCY_KRW',
    payMethod: 'EASY_PAY'
  });

  return response;
};
