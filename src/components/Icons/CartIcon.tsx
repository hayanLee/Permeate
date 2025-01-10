import React from 'react';

interface CartIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CartIcon = ({ size = 24, color = '#302A28', ...styleProps }: CartIconProps) => {
  return (
    <svg
      width={size}
      height={size * (26 / 24)}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth={2}
      {...styleProps}
    >
      <path d="M17.921 19.1301V12.557C17.921 6.17425 23.1049 1 29.4998 1C35.8947 1 41.0789 6.17425 41.0789 12.557V19.1301M5.57143 14.8829H52.7143L57 64H2L5.57143 14.8829Z" />
    </svg>
  );
};

export default CartIcon;
