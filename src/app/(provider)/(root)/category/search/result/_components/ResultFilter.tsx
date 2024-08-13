import FilterBenefits from './FilterBenefits';
import FilterLabel from './FilterLabel';
import FilterPricePoint from './FilterPricePoint';
import FilterPriceType from './FilterPriceType';

const ResultFilter = () => {
  return (
    <div className="filter-container p-4 bg-white">
      <div className="flex flex-col space-y-4">
        <FilterPricePoint />
        <FilterPriceType />
        <FilterBenefits />
        <FilterLabel></FilterLabel>
        <div className="w-full border-t border-gray-200"></div> {/* 선을 추가하여 전체 너비를 차지하게 */}
        <div className="flex justify-between mt-4 px-[10px]">
          <button className="border border-gray-400 text-gray-400 rounded px-4 py-2 w-[220px] h-[46px] mr-[10px]">
            초기화
          </button>
          <button className="bg-[#2c2c2c] text-white rounded px-4 py-2 w-[330px] h-[46px]">40개의 상품 보기</button>
        </div>
      </div>
    </div>
  );
};

export default ResultFilter;
