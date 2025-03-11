const CloseIcon = ({ ...styleProps }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" {...styleProps}>
      <path d="M25 1L1 25M25 25L1 1" stroke="#231815" />
    </svg>
  );
};

export default CloseIcon;
