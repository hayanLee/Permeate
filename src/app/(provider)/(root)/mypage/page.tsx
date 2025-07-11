import Loading from '@/components/Loading';
import { PageHeader } from '@/components/Navigation';
import {
  AUTH_LOG_IN_PATHNAME,
  MYPAGE_ADDRESS_PATHNAME,
  MYPAGE_COUPON_PATHNAME,
  MYPAGE_EDIT_PATHNAME,
  MYPAGE_MILEAGE_PATHNAME,
  MYPAGE_ORDERS_PATHNAME,
  MYPAGE_REVIEW_PATHNAME,
  MYPAGE_WISH_PATHNAME
} from '@/constant/pathname';
import { createClient } from '@/supabase/server';
import Banner from '@@/public/banner/tempBanner.svg';
import InfoCard from './_components/InfoCard';
import { MyPageContent } from './_components/MyPageContent';
import Profile from './_components/Profile';

const LINKS = [
  { title: '주문/배송 내역', href: MYPAGE_ORDERS_PATHNAME },
  { title: '찜 리스트', href: MYPAGE_WISH_PATHNAME },
  { title: '쿠폰 내역', href: MYPAGE_COUPON_PATHNAME },
  { title: '마일리지 내역', href: MYPAGE_MILEAGE_PATHNAME },
  { title: '회원 정보 변경', href: MYPAGE_EDIT_PATHNAME },
  { title: '배송지 관리', href: MYPAGE_ADDRESS_PATHNAME }
];

const MyMainPage = async () => {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return (
      <div className="flex flex-col">
        <PageHeader title="마이페이지" showHomeButton />
        <Profile />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg mb-4">로그인이 필요한 서비스입니다.</p>
          <a href={AUTH_LOG_IN_PATHNAME} className="text-accent underline">
            로그인하기
          </a>
        </div>
      </div>
    );
  }

  // 사용자 정보 조회
  const { data: userData } = await supabase.from('Users').select('*').eq('id', authData.user.id).single();

  if (!userData) {
    return <Loading />;
  }

  // 쿠폰 데이터 조회
  const { data: coupons } = await supabase.from('Coupons').select('*').eq('userId', authData.user.id);

  // 리뷰 데이터 조회
  const { data: reviews } = await supabase.from('Reviews').select('*').eq('userId', authData.user.id);

  const mileage = userData.mileage;
  const couponCount = coupons?.length || 0;
  const reviewCount = reviews?.length || 0;

  return (
    <div className="flex flex-col">
      <PageHeader title="마이페이지" showHomeButton />
      <Profile />

      <div className="flex bg-muted/30 p-5 gap-x-2.5">
        <InfoCard title="보유 마일리지" href={MYPAGE_MILEAGE_PATHNAME}>
          {mileage || '-'}p
        </InfoCard>
        <InfoCard title="쿠폰" href={MYPAGE_COUPON_PATHNAME}>
          {couponCount}
        </InfoCard>
        <InfoCard title="후기" href={MYPAGE_REVIEW_PATHNAME}>
          {reviewCount}
        </InfoCard>
      </div>
      <Banner className="mx-auto my-4" />
      <MyPageContent links={LINKS} />
    </div>
  );
};

export default MyMainPage;
