import React, { useId } from "react";

const WarehouseIcon = ({ className = "" }) => {
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
                <linearGradient id={g1} x1="12" y1="2.858" x2="12" y2="10.417" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#cfd9ff" />
                </linearGradient>
                <linearGradient id={g2} x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#809afb" />
                    <stop offset="1" stopColor="#07269b" />
                </linearGradient>
                <linearGradient id={g3} x1="16.5" y1="2.858" x2="16.5" y2="20.953" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#cfd9ff" />
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
                    <rect x="8" y="3" width="8" height="6" fill={`url(#${g1})`} />
                    <path
                        d="M19,3h-4c-0.552,0 -1,0.448 -1,1v2c0,0.552 -0.448,1 -1,1h-2c-0.552,0 -1,-0.448 -1,-1v-2c0,-0.552 -0.448,-1 -1,-1h-4c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2zM18,19h-3c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1h3c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1z"
                        fill={`url(#${g2})`}
                    />
                    <path
                        d="M15,19h3c0.552,0 1,-0.448 1,-1v0c0,-0.552 -0.448,-1 -1,-1h-3c-0.552,0 -1,0.448 -1,1v0c0,0.552 0.448,1 1,1z"
                        fill={`url(#${g3})`}
                    />
                </g>
            </g>
        </svg>
    );
};

export default WarehouseIcon;