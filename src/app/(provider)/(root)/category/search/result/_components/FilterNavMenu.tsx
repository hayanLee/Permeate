import ArrowIcon from '@/components/Icons/ArrowIcon';
import { PropsWithChildren } from 'react';

interface FilterNavMenuType {
  onClick: () => void;
  isActive: boolean;
}

const FilterNavMenu = ({ children, onClick, isActive }: PropsWithChildren<FilterNavMenuType>) => {
  return (
    <button
      onClick={onClick}
      className={`h-[32px] py-0 px-4 rounded-full border border-[#b3b3b3] flex justify-between items-center mr-4 
        ${isActive ? 'bg-[#302A28] text-white' : 'bg-white'} `}
    >
      <p className="text-[14px]">{children}</p>
      <ArrowIcon
        className={`${isActive ? 'rotate-90' : '-rotate-90'} ml-2`}
        height={15}
        strokeWidth={2}
        color={isActive ? 'white' : 'black'}
      />
    </button>
  );
};

export default FilterNavMenu;
