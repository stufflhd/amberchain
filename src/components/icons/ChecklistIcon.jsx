import React, { useId } from "react";

const ChecklistIcon = ({ className = "" }) => {
  const id = useId();
  const g1 = `${id}-color-1`;
  const g2 = `${id}-color-2`;

  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id={g1} x1="12" y1="1" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7290ff" />
          <stop offset="1" stopColor="#07269b" />
        </linearGradient>
        <linearGradient id={g2} x1="12" y1="1.961" x2="12" y2="21.998" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#afbff9" />
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
            d="M20,5v15c0,1.1 -0.9,2 -2,2h-12c-1.1,0 -2,-0.9 -2,-2v-15c0,-1.1 0.9,-2 2,-2h2.54c0.36,0 0.68,-0.19 0.86,-0.5c0.52,-0.9 1.49,-1.5 2.6,-1.5c1.11,0 2.08,0.6 2.6,1.5c0.18,0.31 0.5,0.5 0.86,0.5h2.54c1.1,0 2,0.9 2,2z"
            fill={`url(#${g1})`}
          />
          <path
            d="M13,4c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1zM17.76,14.49c-0.33,-0.32 -0.86,-0.32 -1.19,0l-0.65,0.65c-0.23,0.24 -0.61,0.24 -0.84,0l-0.65,-0.65c-0.33,-0.32 -0.86,-0.32 -1.19,0c-0.32,0.33 -0.32,0.86 0,1.19l1.09,1.07c0.65,0.65 1.69,0.65 2.34,0l1.09,-1.07c0.32,-0.33 0.32,-0.86 0,-1.19zM17.76,8.49c-0.33,-0.32 -0.86,-0.32 -1.19,0l-0.65,0.65c-0.23,0.24 -0.61,0.24 -0.84,0l-0.65,-0.65c-0.33,-0.32 -0.86,-0.32 -1.19,0c-0.32,0.33 -0.32,0.86 0,1.19l1.09,1.07c0.65,0.65 1.69,0.65 2.34,0l1.09,-1.07c0.32,-0.33 0.32,-0.86 0,-1.19zM10.5,15h-3.5c-0.55,0 -1,0.45 -1,1c0,0.55 0.45,1 1,1h3.5c0.55,0 1,-0.45 1,-1c0,-0.55 -0.45,-1 -1,-1zM10.5,9h-3.5c-0.55,0 -1,0.45 -1,1c0,0.55 0.45,1 1,1h3.5c0.55,0 1,-0.45 1,-1c0,-0.55 -0.45,-1 -1,-1z"
            fill={`url(#${g2})`}
          />
        </g>
      </g>
    </svg>
  );
};

export default ChecklistIcon; 