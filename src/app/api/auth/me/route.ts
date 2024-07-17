import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json({ error: '유저 정보 가져오기 오류', details: error.message });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: '유저 정보 fetch 중 네트워크 오류', details: error });
  }
}
