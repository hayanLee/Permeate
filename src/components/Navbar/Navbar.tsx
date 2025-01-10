'use client';
import { HOME } from '@/constant/pathname';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LeftArrowIcon from '../Icons/ArrowIcon';
import HomeIcon from '../Icons/HomeIcon';

interface NavbarProps {
  title: string;
  isHome?: boolean;
}

const Navbar = ({ title, isHome }: NavbarProps) => {
  const router = useRouter();
  const handleGoback = () => router.back();
  return (
    <div className="flex items-center relative p-5 text-[20px] tracking-[6px] justify-between">
      <LeftArrowIcon className="cursor-pointer" onClick={handleGoback} />

      <h1 className="text-center grow">{title}</h1>

      {isHome ? (
        <Link href={HOME} className="ml-auto">
          <HomeIcon className="cursor-pointer" />
        </Link>
      ) : (
        <div className="w-5"></div>
      )}
    </div>
  );
};

export default Navbar;
