'use client';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/products';
import ShareSVG from '@@/public/icon/share.svg';
import { useEffect } from 'react';
declare global {
  interface Window {
    Kakao: any;
  }
}
type ProductProps = {
  product: Product;
};
const Share = ({ product }: ProductProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY!);
    };
    document.head.appendChild(script);
  }, []);

  const handleShareProduct = (): void => {
    const isDiscounted = product.discountedPrice !== product.price;

    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'commerce',
        content: {
          title: product.title,
          imageUrl: product.thumbNailURL ?? '',
          link: {
            mobileWebUrl: process.env.NEXT_PUBLIC_BASE_URL!,
            webUrl: process.env.NEXT_PUBLIC_BASE_URL!
          },
          description: '달콤한 호박 | 말랑말랑 | 불가리안 로즈'
        },
        commerce: {
          regularPrice: product.price,
          ...(isDiscounted && {
            discountPrice: product.discountedPrice,
            discountRate: product.discount
          }),
          currencyUnit: '원'
        },
        installTalk: true,
        buttons: [
          {
            title: '구매하기',
            link: {
              mobileWebUrl: `${process.env.NEXT_PUBLIC_BASE_URL!}/products/${product.productId}`,
              webUrl: `${process.env.NEXT_PUBLIC_BASE_URL!}/products/${product.productId}`
            }
          }
        ]
      });
    }
  };

  return (
    <Button size="xl" variant="defaultline" onClick={handleShareProduct}>
      <div className="flex-row-10 justify-center p-5-2 ">
        <ShareSVG />
        <span className="text-[#B3B3B3]">공유하기</span>
      </div>
    </Button>
  );
};

export default Share;
