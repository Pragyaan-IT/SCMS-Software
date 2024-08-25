"use client"
import React, { useState } from 'react'
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import ChatInput from './ChatInput'
import { motion } from 'framer-motion'
import ChatBotIcon from './ChatBotIcon'
import { ScrollArea } from '../ui/scroll-area'

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
                    className="fixed right-20 z-50 top-0 py-2 flex items-center h-full border flex-col md:w-[30vw] bg-white shadow-lg"
                >
                    <h1 className='py-2 font-bold px-8 mb-4 border-b border-gray-600 w-full'>
                        Ask Queries Directly to Teachers
                    </h1>
                    <ScrollArea className="w-full px-6">
                        <div className="w-full h-5/6">
                            <SenderMessage name='Dr. Ajitesh Kumar' message='Hello Nitish, How are you' time='06:15 PM' pic="https://pagedone.io/asset/uploads/1710412177.png" />
                            <ReceiverMessage name='You' message='I am fine sir but Aman have some problem' time='06:16 PM' pic="https://pagedone.io/asset/uploads/1704091591.png" />
                            <SenderMessage name='Dr. Ajitesh Kumar' message='What happens, is he okay ?' time='06:16 PM' pic="https://pagedone.io/asset/uploads/1710412177.png" />
                            <ReceiverMessage name='You' message='I think he don&apos;t like mess food, so he is very angry.' time='06:16 PM' pic="https://pagedone.io/asset/uploads/1704091591.png" />
                            <SenderMessage name='Dr. Ajitesh Kumar' message='Okay, I will talk to him.' time='06:17 PM' pic="https://pagedone.io/asset/uploads/1710412177.png" />
                            <ReceiverMessage name='You' message='Sure sir' time='06:16 PM' pic="https://pagedone.io/asset/uploads/1704091591.png" />
                        </div>
                    </ScrollArea>
                    <ChatInput />
                </motion.div>
            }
        </>
    )
}


export default ChatBot