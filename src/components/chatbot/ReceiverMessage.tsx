import React from 'react'

interface ReceiverMessageProps {
    name: string;
    message: string;
    pic: string;
    time: string;
}

const ReceiverMessage = ({name, message, pic, time}: ReceiverMessageProps) => {
    return (
        <div className="flex gap-2.5 justify-end pb-2">
            <div className="">
                <div className="grid mb-2">
                    <h5 className="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">{name}</h5>
                    <div className="px-3 py-2 bg-black ml-auto rounded">
                        <h2 className="text-white text-sm font-normal leading-snug">{message}</h2>
                    </div>
                    <div className="justify-start items-center inline-flex w-4/5 ml-auto">
                        <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">{time}</h3>
                    </div>
                </div>
            </div>
            <img src={pic} alt="Hailey image" className="w-10 h-11" />
        </div>
    )
}

export default ReceiverMessage