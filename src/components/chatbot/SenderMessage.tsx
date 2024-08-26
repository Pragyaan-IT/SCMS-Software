import React from 'react'

interface SenderMessageProps {
    name: string;
    message: string;
    pic: string;
    time: string;
}

const SenderMessage = ({name, message, pic, time}: SenderMessageProps) => {
    return (
        <div className="grid pb-2">
            <div className="flex gap-2.5 mb-2">
                <img src={pic} alt="Shanay image" className="w-10 h-11" />
                <div className="grid">
                    <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">{name}</h5>
                    <div className="w-max grid">
                        <div className="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                            <h5 className="text-gray-900 text-sm font-normal leading-snug">{message}</h5>
                        </div>
                        <div className="justify-end items-center inline-flex mb-2.5">
                            <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">{time}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SenderMessage