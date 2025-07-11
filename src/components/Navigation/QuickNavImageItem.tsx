'use client';
import Image from 'next/image';
import { toast } from 'sonner';

const QuickNavImageItem = ({ item }: { item: { ThumbnailImg: string; title: string } }) => {
  const handleClick = () => {
    toast.info(item.title);
  };
  return (
    <div
      className="flex flex-col items-center gap-y-1 justify-center cursor-pointer"
      key={item.title}
      onClick={handleClick}
    >
      <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden drop-shadow-lg">
        <Image className="absolute object-cover" src={item.ThumbnailImg} fill alt={item.title} loading="eager" />
      </div>
      <span className="text-xs font-semibold">{item.title}</span>
    </div>
  );
};

export default QuickNavImageItem;
