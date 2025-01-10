import React from 'react';

interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
  isButton?: boolean;
}

const HeartIcon = ({ color = '#B3B3B3', size = 14, isButton = false, ...styleProps }: HeartIconProps) => {
  const buttonStyle = isButton
    ? {
        fill: 'white',
        stroke: color
      }
    : { fill: color };

  return (
    <svg width={size + 2} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...styleProps}>
      <path
        d="M7.13163 2.22399L8 3.09235L8.86924 2.22399C10.5001 0.592297 13.1454 0.592297 14.7762 2.22399C16.4079 3.8548 16.4079 6.50016 14.7762 8.13185L8.00087 14.9081L1.22377 8.13185C-0.407922 6.50016 -0.407922 3.8548 1.22377 2.22311C2.85458 0.592297 5.49994 0.592297 7.13163 2.22311V2.22399Z"
        {...buttonStyle}
      />
    </svg>
  );
};

export default HeartIcon;
