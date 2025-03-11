'use client';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import { SkeletonCard } from '../Card';
import HotIcon from '../Icons/HotIcon';
import { Sliders } from '../Sliders';

const CurrentProducts = ({ title, option }: { title: string; option: string }) => {
  const { data: products, isPending } = useProductsQuery(option);
  const isNeedHotIcon = title === '지금 가장 인기 있는 제품';
  const content = isPending ? (
    <div className="flex gap-x-6 mt-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  ) : (
    <Sliders data={products ?? []} count={3} />
  );

  return (
    <div className="flex flex-col p-5-2">
      <h2 className="text-xl font-bold flex items-center gap-1">
        {title} {isNeedHotIcon && <HotIcon />}
      </h2>
      {content}
    </div>
  );
};

export default CurrentProducts;
