import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const option = searchParams.get('option') as string;
    const { data } =
      option === 'recent'
        ? await supabase.from('Products').select('*').order('createdAt', { ascending: true }).limit(12)
        : await supabase.from('Products').select('*').limit(12);
    const brandIds = data?.map((product) => product.brandId) || [];
    const { data: brands } = await supabase.from('Brands').select('*').in('brandId', brandIds);

    const brandMap = new Map(brands?.map((brand) => [brand.brandId, brand]));

    const productWithDiscountedPrice: Product[] =
      data?.map((data) => ({
        ...data,
        Brand: brandMap.get(data.brandId) || null,
        discountedPrice: data.price - (data.price * data.discount) / 100
      })) || [];

    return NextResponse.json(productWithDiscountedPrice);
  } catch (error) {
    return NextResponse.json({ error });
  }
}