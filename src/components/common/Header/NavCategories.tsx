import { BRANDS, CATEGORY_SEARCH_RESULT_PATHNAME, EVENT, HOME, SUPPORT } from '@/constant/pathname';
import Link from 'next/link';

const LINKS = [
  { title: '홈', url: HOME },
  { title: '전체상품', url: CATEGORY_SEARCH_RESULT_PATHNAME },
  { title: '기획전', url: EVENT },
  { title: '브랜드', url: BRANDS },
  { title: '고객센터', url: SUPPORT }
];

const NavCategories = () => {
  return (
    <nav className="w-full border-gray-100 bg-white">
      <ul className="flex justify-between items-center px-4 md:px-8 lg:px-12 gap-2 md:gap-6 h-12">
        {LINKS.map(({ title, url }) => (
          <li key={url}>
            <Link
              href={url}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavCategories;
