import React from "react";

const IconTrendingDown = ({ size = 24, color = "var(--foreground)", ...props }) => (
    <svg
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-trending-down"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 7l6 6l4 -4l8 8" />
        <path d="M21 10l0 7l-7 0" />
    </svg>
);

export default IconTrendingDown;