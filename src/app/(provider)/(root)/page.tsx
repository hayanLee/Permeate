import HighlightBanner from '@/components/HighlightBanner';
import {
  BannerSlide,
  CurrentProducts,
  FeaturedProductsOfTheWeek,
  MdReviews,
  PopularBrandsByCategory,
  WidgetSlide
} from '@/components/Sliders';
import Footer from './_components/Footer';
import Header from './_components/Header';
import KakaoTopBanner from './_components/Header/components/KakaoTopBanner';

const RootPage = () => {
  return (
    <div>
      <KakaoTopBanner />
      <div className="sticky top-0 z-40">
        <Header />
      </div>

      <main className="max-w-[600px] mx-auto my-0 h-full w-full overflow-hidden bg-white">
        <BannerSlide />
        <WidgetSlide />
        <HighlightBanner>
          <div className="w-full flex-center text-xl font-bold">
            <span className="text-white">행사중인 브랜드 한번에 몰아보기 &gt;</span>
          </div>
        </HighlightBanner>

        <div className="flex flex-col gap-y-16 mt-10">
          {/* 현재 판매중인 상품 */}
          <CurrentProducts title={'지금 가장 인기 있는 제품'} option="order" />
          <CurrentProducts title={'방금 출시된 제품'} option="recent" />
          <CurrentProducts title={'지금 가장 많이 좋아요 받은 제품'} option="wish" />

          {/* 브랜드 카드 */}
          <PopularBrandsByCategory title="인기 급상승 브랜드 - 캔들" count={4} />

          {/* 제품 카드 */}
          <FeaturedProductsOfTheWeek title="이번주 소개할 브랜드 - " option="brand" count={3} />
          <FeaturedProductsOfTheWeek title="이번주 소개할 제품 - " option="product" count={3} />

          <MdReviews />

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default RootPage;
