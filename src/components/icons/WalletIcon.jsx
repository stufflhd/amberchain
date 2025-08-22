import React, { useId } from "react";

const WalletIcon = ({ className = "" }) => {
  const id = useId();
  const g1 = `${id}-color-1`;
  const g2 = `${id}-color-2`;

  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24px"
      height="24px"
    >
      <defs>
        <linearGradient id={g1} x1="11" y1="2.85" x2="11" y2="20.859" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#7687c9" />
        </linearGradient>
        <linearGradient id={g2} x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7d98ff" />
          <stop offset="1" stopColor="#07269b" />
        </linearGradient>
      </defs>

      <g
        fill="none"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <g transform="scale(10.66667,10.66667)">
          <path
            d="M3,16h16v-12c0,-0.552 -0.448,-1 -1,-1h-12c-1.657,0 -3,1.343 -3,3z"
            fill={`url(#${g1})`}
          />
          <path
            d="M18,7h-12c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1h12c0.55,0 1,-0.45 1,-1c0,-0.55 -0.45,-1 -1,-1h-12c-1.66,0 -3,1.34 -3,3v12c0,1.65 1.35,3 3,3h12c1.65,0 3,-1.35 3,-3v-8c0,-1.65 -1.35,-3 -3,-3zM17,15c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1z"
            fill={`url(#${g2})`}
          />
        </g>
      </g>
    </svg>
  );
};

export default WalletIcon;
