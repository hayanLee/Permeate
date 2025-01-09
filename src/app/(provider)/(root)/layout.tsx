import Image from 'next/image';
import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-h-screen flex justify-center gap-[45px]">
      {/* 배경화면 */}
      <Image src="/main_image.webp" fill priority alt="background" loading="eager" />

      {/* 사이드 배너 */}
      <div className="flex-col justify-center gap-3 xl:flex hidden">
        <div className="relative w-[500px] h-[500px]">
          <Image src="/banner/main_banner.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
        <div className="relative w-[500px] h-[130px]">
          <Image src="/banner/main_event_banner_1.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
        <div className="relative w-[500px] h-[130px]">
          <Image src="/banner/main_event_banner_2.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
        <div className="relative w-[500px] h-[130px]">
          <Image src="/banner/main_event_banner_3.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
      </div>

      <div className="relative bg-white w-full max-w-[600px] h-full max-h-screen overflow-scroll flex flex-col">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
