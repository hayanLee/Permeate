'use client';
import useAlert from '@/hooks/useAlert';
import MockData from '@/mockup/banner.json';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface WidgetSlideProps {
  item: {
    ThumbnailImg: string;
    title: string;
  };
}

const WidgetSlide = () => {
  const { showInfoAlert } = useAlert();
  const handleClick = (item: WidgetSlideProps['item']) => showInfoAlert('준비중입니다!');
  return (
    <Carousel>
      <CarouselContent className="px-5 py-6 justify-between">
        {MockData.map((item) => (
          <CarouselItem
            className="rounded-[14px] flex flex-col cursor-pointer basis-auto px-3 py-0"
            key={item.title}
            onClick={() => handleClick(item)}
          >
            <div className="relative w-[72px] h-[72px]">
              <Image className="object-cover" src={item.ThumbnailImg} fill alt={item.title} loading="eager" />
            </div>
            <div className="flex justify-center">
              <span className="text-center text-xs mt-1 font-bold">{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default WidgetSlide;
