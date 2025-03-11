import ArrowIcon from '@/components/Icons/ArrowIcon';
import Link from 'next/link';

interface LinkCardProps {
  title: string;
  href?: string;
}

const LinkCard = ({ title, href = '' }: LinkCardProps) => {
  return (
    <Link className="flex items-center px-12 py-5 bg-white border-b" href={href}>
      <p className="grow">{title}</p>
      <ArrowIcon className="rotate-180" color="#B3B3B3" />
    </Link>
  );
};

export default LinkCard;
