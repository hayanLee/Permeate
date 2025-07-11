import Loading from '@/components/Loading';
import { HOME } from '@/constant/pathname';
import { createClient } from '@/supabase/server';
import ProfileImg from '@@/public/profile/profile-sm.svg';
import { redirect } from 'next/navigation';
import { LogOutButton } from './LogOutButton';

const Profile = async () => {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) redirect(HOME);

  const { data: userData } = await supabase.from('Users').select('*').eq('id', authData.user.id).single();

  if (!userData) {
    return <Loading />;
  }

  const name = userData.name;

  return (
    <div className="flex px-5 py-[30px]">
      <ProfileImg className="w-[60px] h-[60px] mr-5" />
      <div className="grow">
        <div className="flex flex-col h-full justify-around font-semibold">
          <div className="flex justify-between">
            <p>
              <span className="text-blue-500">{name}</span> 님 환영합니다!
            </p>
            <LogOutButton />
          </div>
          <p>
            <span className="text-blue-500 text-lg">LV 3.5% 적립 </span>
            무료 배송
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
