import React from 'react'

const ReceiverMessage = () => {
    return (
        <div className="flex gap-2.5 justify-end pb-40">
            <div className="">
                <div className="grid mb-2">
                    <h5 className="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">You</h5>
                    <div className="px-3 py-2 bg-black ml-auto rounded w-4/5">
                        <h2 className="text-white text-sm font-normal leading-snug">I am fine sir, But Aman have some problems</h2>
                    </div>
                    <div className="justify-start items-center inline-flex w-4/5 ml-auto">
                        <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h3>
                    </div>
                </div>
            </div>
            <img src="https://pagedone.io/asset/uploads/1704091591.png" alt="Hailey image" className="w-10 h-11" />
        </div>
    )
}

export default ReceiverMessage