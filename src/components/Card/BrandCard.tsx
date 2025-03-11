import { Brand } from '@/types/brands';
import Image from 'next/image';

export interface BrandCardProps {
  brand: Brand & { logoURL: string };
}
const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <div className="w-[100px] h-[100px] rounded-[8px] relative">
      <Image
        src={brand.logoURL || ''}
        fill
        alt={brand.enName || ''}
        className="object-contain absolute"
        quality={20}
        loading="lazy"
      />
      <div className="w-full h-5 bg-[#302A28] flex-center rounded-b-[8px] absolute bottom-0 ">
        <span className="text-xs text-white">{brand.krName}</span>
      </div>
    </div>
  );
};

export default BrandCard;
