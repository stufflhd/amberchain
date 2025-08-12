import React from "react";

const IconTrendingUp = ({ size = 24, color = "var(--foreground)", ...props }) => (
    <svg
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 17l6 -6l4 4l8 -8" />
        <path d="M14 7l7 0l0 7" />
    </svg>
);

export default IconTrendingUp;