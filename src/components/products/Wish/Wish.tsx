'use client';
import useWishesMutation from '@/hooks/mutation/useWishesMutation';
import useWishesQuery from '@/hooks/query/useWishesQuery';
import { useParams } from 'next/navigation';
const DEFAULT_HEART = '🤍';
const PUSHED_HEART = '❤️';

const Wish = () => {
  const { productId } = useParams<{ productId: string }>();
  const userId = 'c7b26340-92fc-4dc3-91ec-5151091251f2';

  const { data: getLikes } = useWishesQuery({ productId: Number(productId), userId });
  const addMutation = useWishesMutation({ getLikes, productId: Number(productId), userId });

  return (
    <button onClick={() => addMutation.mutate()}>
      <span>{getLikes?.userLike ? PUSHED_HEART : DEFAULT_HEART}</span>
      <span>찜하기</span>
    </button>
  );
};

export default Wish;
