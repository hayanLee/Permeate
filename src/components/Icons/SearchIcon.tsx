import React from 'react';

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const SearchIcon = ({ size = 26, color = '#B3B3B3', ...styleProps }: SearchIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 26 26" fill="none" {...styleProps}>
      <path
        d="M16.4667 16.4667L25 25M19.1333 10.0667C19.1333 15.0741 15.0741 19.1333 10.0667 19.1333C5.05929 19.1333 1 15.0741 1 10.0667C1 5.05929 5.05929 1 10.0667 1C15.0741 1 19.1333 5.05929 19.1333 10.0667Z"
        stroke={color}
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
