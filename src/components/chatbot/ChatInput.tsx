
// ChatInput.js
import React, { useState } from 'react';
import { Send, UserCircle2Icon } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }:any) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;
        onSendMessage(inputMessage);
        setInputMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="w-11/12 pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between bg-white">
            <div className="flex items-center gap-2 flex-grow">
                <UserCircle2Icon size={20} />
                <input
                    className="grow shrink w-full text-black text-xs font-medium leading-4 focus:outline-none"
                    placeholder="Type here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="flex items-center gap-2">
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    {/* SVG path data */}
                </svg>
                <button
                    type="submit"
                    className="items-center flex px-3 py-2 bg-black rounded-full shadow"
                    disabled={isLoading}
                >
                    <Send size={16} color='#fff' />
                    <h3 className="text-white text-xs font-semibold leading-4 px-2">Send</h3>
                </button>
            </div>
        </form>
    );
};

export default ChatInput;