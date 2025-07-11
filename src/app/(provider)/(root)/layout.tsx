import Image from 'next/image';
import { PropsWithChildren } from 'react';
import PathAwareHeader from './_components/PathAwareHeader';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center gap-[45px] relative">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 -z-10">
        <Image src="/main_image.webp" alt="background" fill priority className="object-cover" />
      </div>

      {/* 이벤트 배너 */}
      <div className="h-full flex-col justify-center gap-3 xl:flex hidden">
        <Image src="/images/banner/main/main_banner.webp" alt="메인 배너" width={500} height={500} />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative bg-white w-full h-full max-w-[600px] overflow-scroll flex flex-col">
        <PathAwareHeader />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
