import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchPage = () => {
  return (
    <div>
      <section className="flex justify-between items-center mb-4">
        <Button>{'<'}</Button>
        <h2 className="flew-grow text-center">검색</h2>
        <div className="w-10"></div>
      </section>
      <section className="flex justify-center items-center">
        <Input />
        <Button>검색</Button>
      </section>
      <section>최근 검색어</section>
      <section>인기 검색어</section>
      <section>검색 결과 리스트</section>
    </div>
  );
};

export default SearchPage;
