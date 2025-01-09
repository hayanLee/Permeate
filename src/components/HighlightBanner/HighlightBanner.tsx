import { PropsWithChildren } from 'react';

const HighlightBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative cursor-pointer hover:brightness-90 active:brightness-110 h-[80px] bg-perme-dark">
      <div className="absolute top-0 flex-row-10 justify-between p-5-2 w-h-full">{children}</div>
    </div>
  );
};

export default HighlightBanner;
