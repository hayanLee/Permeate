'use client';

import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { Accordion } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useOrderListQuery from '@/hooks/query/useOrderListQuery';
import MockReviews from '@/mockup/userReview.json';
import OrderCard from '../orders/_components/OrderCard';
import ReviewItem from '../orders/_components/ReviewItem';

const ReviewPage = () => {
  const { data: OrderList, isPending } = useOrderListQuery();
  if (isPending) return <Loading />;

  return (
    <div>
      <Navbar title="리뷰" isHome />
      <Tabs defaultValue="wrote" className="flex flex-col mx-[50px]">
        <TabsList>
          <TabsTrigger value="writable" className="px-10">
            지금 작성 가능한 리뷰
          </TabsTrigger>
          <TabsTrigger value="wrote" className="px-10">
            내가 작성한 리뷰
          </TabsTrigger>
        </TabsList>
        <TabsContent value="writable">
          <Accordion type="single" collapsible>
            {OrderList?.map((order) => <OrderCard key={order.orderId} order={order} review />)}
          </Accordion>
        </TabsContent>

        <TabsContent value="wrote">
          <Accordion type="single" collapsible>
            {MockReviews.map((review) => (
              <ReviewItem review={review} key={review.reviewId} />
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewPage;
