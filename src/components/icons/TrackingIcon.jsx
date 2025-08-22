import React, { useId } from "react";

const TrackingIcon = ({ className = "" }) => {
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
                <linearGradient id={g1} x1="12" y1="4.004" x2="12" y2="29.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.5" stopColor="#6b88f9" />
                    <stop offset="1" stopColor="#07269b" />
                </linearGradient>
                <linearGradient id={g2} x1="12" y1="3" x2="12" y2="15.981" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#6b88f9" />
                    <stop offset="1" stopColor="#07269b" />
                </linearGradient>
                <linearGradient id={g3} x1="12" y1="6" x2="12" y2="10" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#bdc8f0" />
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
                    <ellipse cx="12" cy="16.5" rx="10" ry="4.5" fill={`url(#${g1})`} />
                    <path
                        d="M17,8c0,3.03 -2.74,6.15 -4.26,7.67c-0.42,0.42 -1.05,0.41 -1.48,0c-1.57,-1.5 -4.26,-4.64 -4.26,-7.67c0,-2.76 2.24,-5 5,-5c2.76,0 5,2.24 5,5z"
                        fill={`url(#${g2})`}
                    />
                    <circle cx="12" cy="8" r="2" fill={`url(#${g3})`} />
                </g>
            </g>
        </svg>
    );
};

export default TrackingIcon;