import { getProductById } from '@/api/product';
import Cart from '@/components/products/Cart';
import Wish from '@/components/products/Wish';
import Image from 'next/image';
interface Params {
  params: { productId: string };
}
const ProductDetailPage = async ({ params }: Params) => {
  const product = await getProductById({ params });

  return (
    <div>
      <div>
        <Image src={product!.thumbNailURL} width={100} height={100} alt={product!.title} />
        <Image src={product!.ImagesURL} width={100} height={100} alt={product!.title} />
      </div>
      <h3>{product?.title}</h3>
      <p>
        {product?.price.toLocaleString()} {product?.discountedPrice.toLocaleString()} {product?.discount}% 상품 가격
        (할인 가격 등 포함)
      </p>
      <p> 배송 정보, 배송비 정보</p>
      <div>상품 상세 설명</div>

      <Wish />
      <Cart />
      <div>상품 상세 페이지</div>
    </div>
  );
};

export default ProductDetailPage;
