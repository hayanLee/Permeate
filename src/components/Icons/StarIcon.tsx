interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // 아이콘 크기
  color?: string; // 아이콘 색상
}

const StarIcon = ({ size = 11, color = '#0348FF', ...styleProps }: StarIconProps) => {
  return (
    <svg
      width={size}
      height={(size * 10) / 11} // width 비율에 맞춰서 height 조정
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...styleProps}
    >
      <path
        id="Star 4"
        d="M5.5 1.09416L6.71046 3.45029C6.78306 3.59161 6.9185 3.69001 7.07533 3.71539L9.6902 4.13852L7.82344 6.01782C7.71148 6.13054 7.65974 6.28976 7.68407 6.44676L8.08969 9.0644L5.7255 7.86974C5.58371 7.79809 5.41629 7.79809 5.2745 7.86974L2.91031 9.0644L3.31593 6.44676C3.34026 6.28976 3.28852 6.13054 3.17656 6.01782L1.3098 4.13852L3.92467 3.71539C4.0815 3.69001 4.21694 3.59161 4.28954 3.45029L5.5 1.09416Z"
        stroke={color} // stroke 색상 설정
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default StarIcon;
