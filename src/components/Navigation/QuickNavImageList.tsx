import MockData from '@/mockup/banner.json';
import QuickNavImageItem from './QuickNavImageItem';

const QuickNavImageList = () => {
  return (
    <div className="flex gap-x-2 justify-around mx-auto py-4">
      {MockData.map((item, idx) => (
        <QuickNavImageItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default QuickNavImageList;
