'use client';
import { useAuthMutation } from '@/hooks/mutation';

export function LogOutButton() {
  const { logOutMutation } = useAuthMutation();
  const handleLogOut = () => logOutMutation();

  return (
    <button onClick={handleLogOut} className="text-gray-500 cursor-pointer hover:brightness-90 active:brightness-110">
      로그아웃
    </button>
  );
}
