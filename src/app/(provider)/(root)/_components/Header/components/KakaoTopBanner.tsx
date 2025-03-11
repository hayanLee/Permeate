import { cn } from '@/utils/cn';

const KakaoTopBanner = () => {
  return (
    <div className={cn('w-full h-10 flex justify-center items-center bg-kakao cursor-default overflow-hidden')}>
      <p>
        카카오톡 친구 추가시 <span className="font-semibold">10% 할인 쿠폰</span> 즉시발급
      </p>
    </div>
  );
};

export default KakaoTopBanner;
