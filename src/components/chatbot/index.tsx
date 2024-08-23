"use client"
import React, { useState } from 'react'
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import ChatInput from './ChatInput'
import { motion } from 'framer-motion'
import ChatBotIcon from './ChatBotIcon'

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ChatBotIcon isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
            {
                isOpen &&
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed right-24 z-50 top-0 px-4 py-2 flex items-center h-full border flex-col"
                >
                    <h1 className='py-2 font-bold px-4 mb-4 border-b border-gray-600 w-full'>
                        Ask Queries Directly to Teachers
                    </h1>
                    <div className="w-full h-5/6">
                        <SenderMessage />
                        <ReceiverMessage />
                    </div>
                    <ChatInput />
                </motion.div>
            }
        </>
    )
}


export default ChatBot