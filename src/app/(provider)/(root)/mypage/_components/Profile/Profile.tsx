'use client';
import Loading from '@/components/Loading';
import { AUTH_LOG_IN_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import useAlert from '@/hooks/useAlert';
import Image from 'next/image';
import Link from 'next/link';

const Profile = () => {
  const { showInfoAlert } = useAlert();
  const { logOutMutation } = useAuthMutation();
  const { data: loggedUser, isPending } = useAuthQuery();
  const handleClick = () => showInfoAlert('준비중입니다!');
  const handleLogOut = () => logOutMutation();
  if (isPending) return <Loading />;
  const name = loggedUser?.userData.name;

  return (
    <div className="flex px-5 py-[30px]">
      {name ? (
        <>
          <Image
            width={52}
            height={52}
            src={'/profile/default-profile.png'}
            alt="기본 프로필이미지"
            objectFit="contain"
          />

          <div className="grow ml-4">
            <div className="flex flex-col h-full justify-around font-semibold">
              <div className="flex justify-between">
                <p>{name} 님 환영합니다!</p>
                {loggedUser && (
                  <span
                    onClick={handleLogOut}
                    className="text-muted cursor-pointer hover:brightness-90 active:brightness-110 "
                  >
                    로그아웃 하기
                  </span>
                )}
              </div>
              <p>
                <span className="text-accent text-lg">LV 3.5%적립 무료 배송 </span>
                <span
                  className="text-muted cursor-pointer text-lg  hover:brightness-90 active:brightness-110"
                  onClick={handleClick}
                >
                  등급 해택 더보기
                </span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center">
          <p>
            지금 회원가입하면 <span className="font-bold">2000P 적립금 증정에 무료배송</span> 기회까지
          </p>
          <Link href={AUTH_LOG_IN_PATHNAME} className="text-accent text-xl mt-2.5 underline">
            로그인/회원가입하기
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
