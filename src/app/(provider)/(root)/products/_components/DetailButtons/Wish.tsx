'use client';

import HeartIcon from '@/components/Icons/HeartIcon';
import { Button } from '@/components/ui/button';
import { useWishesMutation } from '@/hooks/mutation';
import { useWishesQuery } from '@/hooks/query';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import useAlert from '@/hooks/useAlert';
import { Params } from '@/types/products';
import { useParams, useRouter } from 'next/navigation';

const Wish = ({ inner = true }: { inner?: boolean }) => {
  const router = useRouter();
  const { showInfoAlert } = useAlert();
  const { productId } = useParams<Params['params']>();
  const { data: loggedUser } = useAuthQuery();
  const { data: getLikes } = useWishesQuery(Number(productId));
  const addMutation = useWishesMutation({
    data: getLikes?.data || null,
    productId: Number(productId)
  });

  const handleWish = () => {
    if (!loggedUser) {
      showInfoAlert('로그인이 필요한 서비스 입니다');
      router.push('/auth/log-in');
    } else addMutation.mutate();
  };
  if (inner) {
    return (
      <Button size="xl" variant={getLikes?.data ? 'default' : 'defaultline'} onClick={handleWish}>
        <div className="box-container-center">
          <span>{getLikes?.data ? <HeartIcon /> : <HeartIcon isButton />}</span>
          <span>좋아요</span>
          <span className="font-bold">{getLikes?.count}</span>
        </div>
      </Button>
    );
  } else {
    return (
      <div className="flex-center flex-col w-8 hover:cursor-pointer" onClick={handleWish}>
        <span>{getLikes?.data ? <HeartIcon color="black" size={16} /> : <HeartIcon size={16} />}</span>
        <span className="text-sm">{getLikes?.count.toLocaleString()}</span>
      </div>
    );
  }
};

export default Wish;
