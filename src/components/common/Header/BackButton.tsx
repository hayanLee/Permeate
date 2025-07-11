'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  const handleBackBtn = () => router.back();

  return <ArrowLeft onClick={handleBackBtn} className="cursor-pointer" />;
}
