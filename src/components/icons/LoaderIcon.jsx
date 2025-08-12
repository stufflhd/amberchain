import React from 'react'

export default function LoaderIcon({size = 4 , color = 'primary', cls = ''}) {
    return (
        <div className={`animate-spin rounded-full size-${size} border-b-2 border-${color} ${cls} `}/>
    )
}
