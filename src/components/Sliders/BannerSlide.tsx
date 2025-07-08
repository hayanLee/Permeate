'use client';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import bannerData from '@/mockup/mainBanner.json';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';

const BannerSlide = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false
          })
        ]}
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {bannerData.map((item, idx) => (
            <CarouselItem key={idx} className="h-full w-full p-0 m-0">
              <div className="relative w-full h-[600px] overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                  className="object-cover"
                  src={item.ImageURL}
                  fill
                  alt={`메인 배너${idx + 1}`}
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 600px"
                />
                <div className="absolute left-8 bottom-8 z-20">
                  <h4 className="text-3xl font-bold text-white">{item.title}</h4>
                  <p className="text-xl font-normal text-white mt-3">{item.subTitle}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Badge className="absolute bottom-5 right-5">
        <span className="text-sm text-white font-medium rounded-full">
          {current} / {count}
        </span>
      </Badge>
    </div>
  );
};

export default BannerSlide;
