'use client';
import { Sliders } from '@/components/Sliders';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import Image from 'next/image';

interface FeaturedProductsOfTheWeekProps {
  title: string;
  option: string;
  count: number;
}

const FeaturedProductsOfTheWeek = ({ title, option, count }: FeaturedProductsOfTheWeekProps) => {
  const { data: brands = [] } = useProductsQuery(option);

  return (
    <div className="flex flex-col p-5-2">
      <h2 className="text-xl font-bold flex items-center gap-1">
        {option === 'product' ? title + '인센스' : title + (brands[0]?.Brand?.krName ?? '')}
      </h2>

      <div className="w-full h-[250px] rounded my-4 relative">
        <Image
          src="https://www.jejutwn.com/data/photos/20211248/art_16383214817079_6af19a.png"
          fill
          alt={brands[0]?.Brand?.krName ?? '이미지'}
          className="rounded-md"
          loading="eager"
        />
      </div>

      <Sliders data={brands} count={count} />
    </div>
  );
};

export default FeaturedProductsOfTheWeek;
