import { PropsWithChildren } from 'react';
import Header from '../_components/Header';
import KakaoTopBanner from '../_components/Header/components/KakaoTopBanner';

const SubPagesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <KakaoTopBanner />
      <div className="sticky top-0 z-40">
        <Header showNavCategories={false} />
      </div>
      {children}
    </div>
  );
};

export default SubPagesLayout;
