'use client';

import StarIcon from '@/components/Icons/StarIcon';
import Pagination from '@/components/Pagination';
import { useReviewsQuery } from '@/hooks/query';
import useReviewsTotalImagesQuery from '@/hooks/query/useReviewsTotalImagesQuery';
import { Params } from '@/types/products';
import { ReviewType } from '@/types/review';
import RoundedArrow from '@@/public/icon/rounded-arrow.svg';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const filterOptions = ['최신순', '오래된 순', '별점 높은순'];
const itemCountPerPage = 2;
const pageCountPerPage = 5;
const imagesCountLimit = 7;

const ReviewPage = () => {
  const router = useRouter();
  const { productId } = useParams<Params['params']>();
  const [page, setPage] = useState(0);
  const [target, setTarget] = useState('createdAt');
  const [condition, setCondition] = useState(false);

  const { data: reviews } = useReviewsQuery({ page, productId, perCount: itemCountPerPage, target, condition });
  const { data: reviewImagesData } = useReviewsTotalImagesQuery({ productId, limit: imagesCountLimit });

  const handleFilter = useCallback((value: number) => {
    const filters = [
      { target: 'createdAt', condition: false },
      { target: 'createdAt', condition: true },
      { target: 'score', condition: false }
    ];
    const { target, condition } = filters[value];
    setTarget(target);
    setCondition(condition);
  }, []);

  const handleReviewWish = (reviewId: string) => {};
  const renderStars = (score: number) =>
    Array.from({ length: 5 }, (_, index) =>
      index < score ? <StarIcon key={`full-${index}`} fill="#0348FF" /> : <StarIcon key={`empty-${index}`} />
    );

  const renderReviewItem = (review: ReviewType) => (
    <div className="h-auto flex flex-col gap-4" key={review.reviewId}>
      <div className="flex items-center gap-3">
        <Image width={60} height={60} src={'/profile/default-profile.png'} alt="기본 프로필이미지" />
        <div className="flex flex-col">
          <span className="font-bold">{review.User.name}</span>
          <span className="text-sm">{review.Product.notes.join(' | ')}</span>
        </div>
      </div>
      <div className="min-h-[213px] flex-col-10">
        <div className="flex-row-10">
          <div className="flex">{renderStars(review.score ?? 0)}</div>
          <span className="text-xs">{review.createdAt.slice(0, 10)}</span>
        </div>
        <div className="flex-row-10">
          {review.imagesURL?.map((imageURL, index) => (
            <Image key={index} src={imageURL} alt="이미지" width={300} height={300} className="w-h-132 object-cover" />
          ))}
        </div>
        <p>{review.content}</p>
      </div>
    </div>
  );

  return (
    <div className="p-5-2">
      <div className="flex-row-10 mb-3">
        <span className="text-xl">전체 후기 사진</span>
        <span className="text-xl text-[#0348FF]">{reviewImagesData?.totalCount}</span>
      </div>
      <div className="grid-col-4">
        {reviewImagesData?.data?.map((reviewImage, index) => (
          <Image
            key={index}
            src={reviewImage}
            alt="리뷰 이미지"
            width={300}
            height={300}
            className="w-h-132 object-cover"
          />
        ))}
        <div
          className="flex-center flex-col  hover:cursor-pointer w-h-132"
          onClick={() => router.push(`/products/${productId}/review/images`)}
        >
          <RoundedArrow />

          <span className="text-gray-500">전체 보기</span>
        </div>
      </div>

      <div className="p-5-2">
        <span className="text-xl font-semibold">전체 리뷰</span>
        <ul className="h-[64px] flex items-center">
          {(reviews?.data ?? []).length > 0 && (
            <>
              {filterOptions.map((item, index) => (
                <li key={index} className={cx({ 'border-r-2': index < filterOptions.length - 1 })}>
                  <span
                    className="hover:cursor-pointer px-[17px] pr-[18px] py-0 text-center"
                    onClick={() => handleFilter(index)}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>
        <div className="h-[800px] flex-col-20">{reviews?.data.map(renderReviewItem)}</div>

        <div className="text-center">
          {(reviews?.data ?? []).length > 0 && (
            <Pagination
              maxPage={Math.ceil((reviews?.totalCount ?? 1) / itemCountPerPage)}
              itemCountPerPage={itemCountPerPage}
              pageCountPerPage={pageCountPerPage}
              clickListener={(page) => setPage(page - 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
