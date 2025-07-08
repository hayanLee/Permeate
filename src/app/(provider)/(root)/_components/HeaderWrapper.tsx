import HeaderNav from '@/components/common/Header/HeaderNav';
import NavCategories from '@/components/common/Header/NavCategories';
import SearchHeader from '@/components/SearchPage/SearchHeader';

interface HeaderWrapperProps {
  pathname: string;
}

const HeaderWrapper = ({ pathname }: HeaderWrapperProps) => {
  const isReviewPage = pathname.endsWith('/images');
  const isCategoryPage = pathname.startsWith('/category');
  const isCategorySearchResultPage = pathname === '/category/search/result';
  const isProductOrHomePage = pathname.startsWith('/products') || pathname === '/';

  if (isReviewPage) {
    return null;
  }

  if (isCategoryPage && !isCategorySearchResultPage) {
    return <SearchHeader />;
  }

  if (isProductOrHomePage || isCategorySearchResultPage) {
    return (
      <>
        <div className="sticky top-0 z-40">
          <HeaderNav />
          <NavCategories />
        </div>
      </>
    );
  }

  return null;
};

export default HeaderWrapper;
