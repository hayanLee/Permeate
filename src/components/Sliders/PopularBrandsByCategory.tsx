'use client';
import { Sliders } from '@/components/Sliders';
import { Skeleton } from '@/components/ui/skeleton';
import useBrandsQuery from '@/hooks/query/useBrandsQuery';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import { Product } from '@/types/products';
import Image from 'next/image';

interface PopularBrandsByCategoryProps {
  title: string;
  count: number;
}

const PopularBrandsByCategory = ({ title, count }: PopularBrandsByCategoryProps) => {
  const { data: products, isPending: isProductsPending } = useProductsQuery('order');
  const brandIds =
    products
      ?.filter((product: Product) => product.categoryId === '84598475-403c-45db-b6da-22b8c742fea3')
      .map((product: Product) => product.brandId) || [];

  const { data: brands, isPending: isBrandsPending } = useBrandsQuery(brandIds);

  const content =
    isProductsPending || isBrandsPending ? (
      <div className="flex gap-x-6 mt-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton size="rect" key={idx} />
        ))}
      </div>
    ) : (
      <Sliders data={brands ?? []} count={count} />
    );

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-xl font-bold flex items-center gap-1">{title}</h2>

      <div className="w-full h-[250px] mb-[16px] mt-4 relative">
        <Image
          src={'https://img.29cm.co.kr/item/202401/11eebe9d80e9739391ebb5f8eb5447c1.jpg?width=700'}
          fill
          alt="인기 급상승 제품 이미지1"
          loading="lazy"
          className="rounded-md"
        />
      </div>

      {content}
    </div>
  );
};

export default PopularBrandsByCategory;
