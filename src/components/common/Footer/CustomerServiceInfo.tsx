import { Button } from '@/components/ui/button';

const CustomerServiceInfo = () => {
  return (
    <div className="flex flex-col items-center justify-between py-6 px-4 border-r border-gray-200 gap-y-6 bg-white">
      {/* 타이틀 & 전화번호 */}
      <div className="text-center">
        <p className="text-xs text-gray-500 tracking-widest font-semibold mb-1">CS CENTER</p>
        <p className="text-2xl font-bold text-blue-600 underline mb-2">010-1234-1234</p>
      </div>

      {/* 상담/점심시간 */}
      <div className="text-center text-sm font-medium text-gray-700 space-y-1">
        <p>
          상담시간 <span className="block md:inline font-normal text-gray-500">AM 10:00 ~ PM 06:00</span>
        </p>
        <p>
          점심시간 <span className="block md:inline font-normal text-gray-500">PM 12:00 ~ PM 01:00</span>
        </p>
      </div>

      {/* 휴무 안내 */}
      <p className="text-xs text-gray-400">휴일 및 공휴일 휴무</p>

      {/* 버튼 */}
      <Button size="sm">고객센터 전화 연결</Button>
    </div>
  );
};

export default CustomerServiceInfo;
