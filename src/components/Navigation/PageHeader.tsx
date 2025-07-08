'use client';
import { HOME } from '@/constant/pathname';
import { ChevronLeft, House } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
interface PageHeaderProps {
  title: string;
  showHomeButton?: boolean;
}

const PageHeader = ({ title, showHomeButton }: PageHeaderProps) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 items-center relative p-4 tracking-wide">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ChevronLeft />
      </Button>

      <h3 className="text-center grow text-lg">{title}</h3>

      {showHomeButton && (
        <Button variant="ghost" size="icon" asChild>
          <Link href={HOME} className="ml-auto ">
            <House />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
