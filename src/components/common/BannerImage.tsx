import { cn } from '@/utils/cn';
import Image from 'next/image';

interface BannerImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const BannerImage = ({ src, alt, width, height, className }: BannerImageProps) => (
  <div className={cn(`relative w-[${width}px] h-[${height}px]`, className)}>
    <Image src={src} alt={alt} fill className="object-contain absolute" priority />
  </div>
);

export default BannerImage;
