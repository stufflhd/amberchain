import React from "react";

const LoadingIcon = React.forwardRef(({ size = 24, color = "var(--primary)", ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 13 12"
    fill="none"
    stroke={color}
    {...props}
  >
    <g clipPath="url(#clip0_8_3288)">
      <path d="M6.1665 3V1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2915 3.87499L9.3665 2.79999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.1665 6H10.6665" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2915 8.125L9.3665 9.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.1665 9V10.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.04155 8.125L2.96655 9.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.1665 6H1.6665" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.04155 3.87499L2.96655 2.79999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_8_3288">
        <rect width="12" height="12" fill="white" transform="translate(0.166504)" />
      </clipPath>
    </defs>
  </svg>
));

LoadingIcon.displayName = "LoadingIcon";
export default LoadingIcon;
