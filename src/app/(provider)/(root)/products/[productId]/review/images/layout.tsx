import { PageHeader } from '@/components/Navigation';
import { PropsWithChildren } from 'react';
const ReviewImagesLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="relative max-w-[600px] h-screen flex flex-col">
      <PageHeader title="전체후기사진 모아보기" showHomeButton />
      {children}
    </div>
  );
};

export default ReviewImagesLayout;
