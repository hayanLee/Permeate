const CartIcon = ({ ...styleProps }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="25" height="25" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...styleProps}>
      <path
        d="M9.06124 8.76532V4.90816C9.06124 2.47361 11.0348 0.5 13.4694 0.5C15.9039 0.5 17.8776 2.47361 17.8776 4.90816V8.76532M3 8.76532H23.9389V27.5H3V8.76532Z"
        stroke="black"
      />
    </svg>
  );
};

export default CartIcon;
