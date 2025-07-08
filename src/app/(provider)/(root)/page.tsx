import { EventLinkCard } from '@/components/Card';
import { ContactSection, PolicyInfo } from '@/components/common/Footer';
import { BannerSlide, CategoryProducts, CategorySection, CurrentProducts, MdReviews } from '@/components/Sliders';

const RootPage = () => {
  return (
    <main className="bg-white w-full h-full">
      <BannerSlide />
      <EventLinkCard />

      <div className="flex flex-col">
        {/* 현재 판매중인 상품 */}
        <CurrentProducts title={'지금 가장 인기 있는 제품'} option="order" />
        <CurrentProducts title={'방금 출시된 제품'} option="recent" />
        <CurrentProducts title={'지금 가장 많이 좋아요 받은 제품'} option="wish" />

        {/* 카테고리1 */}
        <CategorySection title="인기 급상승 브랜드 - 캔들" count={4} />
        <CategoryProducts title="이번주 소개할 브랜드 - " option="brand" count={3} />
        <CategoryProducts title="이번주 소개할 제품 - " option="product" count={3} />

        <MdReviews />

        <ContactSection />
        <PolicyInfo />
      </div>
    </main>
  );
};

export default RootPage;
