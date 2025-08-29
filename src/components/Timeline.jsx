import React from 'react';
import { Check } from 'lucide-react';

const AmbTimeline = ({ items }) => {
    return (
        <div className="timeLineContainer">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="timeLineItem flex flex-nowrap items-stretch justify-start mt-1"
                >
                    <div className="w-1/3 max-w-24 min-h-6 h-fit flex items-center justify-end">
                        <b className='whitespace-break-spaces text-right'>{item.label}</b>
                    </div>
                    <div className="w-14 flex flex-col justify-start items-center gap-1">
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${item.completed ? 'bg-primary' : 'border-primary/20 border-2'
                                }`}
                        >
                            {item.completed && <Check className="size-4 stroke-white" />}
                        </div>
                        <div
                            className={`
                                w-[2px] h-[calc(100%-1.75rem)] rounded-full 
                                ${index === items.length - 1 ? 'hidden' : ''}
                                ${item.completed && items[index + 1]?.completed ? 'bg-primary' : 'border-primary/20 border'}
                            `}
                        ></div>
                    </div>
                    <div className="w-full min-h-24 space-y-2 pb-8">
                        <div className="head h-6 flex items-center justify-start">
                            <b>{item.title}</b>
                        </div>
                        <div className="content flex flex-col gap-1">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AmbTimeline;