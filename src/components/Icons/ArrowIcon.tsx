const ArrowIcon = ({ color = '#231815', ...styleProps }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="13" height="20" viewBox="0 0 13 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...styleProps}>
      <path d="M12.5556 1L1 13L12.5556 25" stroke={color} />
    </svg>
  );
};

export default ArrowIcon;
