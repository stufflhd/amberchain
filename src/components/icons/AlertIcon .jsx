import React, { useId } from "react";

const AlertIcon = ({ className = "" }) => {
  const id = useId();
  const g1 = `${id}-color-1`;
  const g2 = `${id}-color-2`;
  const g3 = `${id}-color-3`;

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
        <linearGradient id={g1} x1="12" y1="3" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7a93f0" />
          <stop offset="1" stopColor="#07269b" />
        </linearGradient>
        <linearGradient id={g2} x1="4" y1="0.035" x2="4" y2="15.515" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#7a93f0" />
          <stop offset="1" stopColor="#07269b" />
        </linearGradient>
        <linearGradient id={g3} x1="20" y1="0.224" x2="20" y2="15.704" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#7a93f0" />
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
            d="M20,17c-0.552,0 -1,-0.448 -1,-1v-3c0,-4.671 -1.821,-7.516 -4.514,-8.55c-0.362,-0.139 -0.671,-0.371 -0.909,-0.677c-0.365,-0.47 -0.935,-0.773 -1.577,-0.773c-0.642,0 -1.212,0.303 -1.577,0.773c-0.238,0.306 -0.547,0.538 -0.909,0.677c-2.693,1.034 -4.514,3.879 -4.514,8.55v3c0,0.552 -0.448,1 -1,1v0c-0.552,0 -1,0.448 -1,1v1c0,0.552 0.448,1 1,1h5.149c0.416,0 0.822,0.237 0.953,0.632c0.265,0.795 1.014,1.368 1.898,1.368c0.884,0 1.633,-0.573 1.898,-1.368c0.131,-0.395 0.538,-0.632 0.953,-0.632h5.149c0.552,0 1,-0.448 1,-1v-1c0,-0.552 -0.448,-1 -1,-1z"
            fill={`url(#${g1})`}
          />
          <path
            d="M2.5,8.33v0c0.478,0.276 1.09,0.112 1.366,-0.366l2,-3.464c0.276,-0.478 0.112,-1.09 -0.366,-1.366v0c-0.478,-0.276 -1.09,-0.112 -1.366,0.366l-2,3.464c-0.276,0.479 -0.112,1.09 0.366,1.366z"
            fill={`url(#${g2})`}
          />
          <path
            d="M21.5,8.33v0c-0.478,0.276 -1.09,0.112 -1.366,-0.366l-2,-3.464c-0.276,-0.478 -0.112,-1.09 0.366,-1.366v0c0.478,-0.276 1.09,-0.112 1.366,0.366l2,3.464c0.276,0.479 0.112,1.09 -0.366,1.366z"
            fill={`url(#${g3})`}
          />
        </g>
      </g>
    </svg>
  );
};

export default AlertIcon;