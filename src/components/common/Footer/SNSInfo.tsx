import { FACEBOOK_PATH, INSTAGRAM_PATH, WHATSAPP_PATH, YOUTUBE_PATH } from '@/constant/pathname';
import FacebookIcon from '@@/public/sns/facebook.svg';
import InstagramIcon from '@@/public/sns/instagram.svg';
import WhatsAppIcon from '@@/public/sns/whatsapp.svg';
import YouTubeIcon from '@@/public/sns/youtube.svg';
import Link from 'next/link';

const SNSInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3">
      <h3 className="text-lg font-bold text-gray-700 mb-1 tracking-wide">Contact us</h3>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={INSTAGRAM_PATH}
          aria-label="Instagram"
          className="transition hover:scale-110 hover:opacity-80 active:scale-95"
        >
          <InstagramIcon />
        </Link>
        <Link
          href={FACEBOOK_PATH}
          aria-label="Facebook"
          className="transition hover:scale-110 hover:opacity-80 active:scale-95"
        >
          <FacebookIcon />
        </Link>
        <Link
          href={YOUTUBE_PATH}
          aria-label="YouTube"
          className="transition hover:scale-110 hover:opacity-80 active:scale-95"
        >
          <YouTubeIcon />
        </Link>
        <Link
          href={WHATSAPP_PATH}
          aria-label="WhatsApp"
          className="transition hover:scale-110 hover:opacity-80 active:scale-95"
        >
          <WhatsAppIcon />
        </Link>
      </div>
    </div>
  );
};

export default SNSInfo;
