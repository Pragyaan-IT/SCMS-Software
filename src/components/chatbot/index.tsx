"use client"
import React, { useState, useEffect, useRef } from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import ChatInput from './ChatInput';
import { motion } from 'framer-motion';
import ChatBotIcon from './ChatBotIcon';
import { ScrollArea } from '../ui/scroll-area';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<any>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (content: any) => {
        if (!content.trim()) return;

        const newMessage = { role: 'user', content, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);

        try {
            content += "Not more than 50 words try to limit in small explanation";
            const response = await fetch('https://8000-01j6f35wcrtxm9mqx4xdkcv7wm.cloudspaces.litng.ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content }],
                    temperature: 0.2,
                    top_p: 0.7,
                    max_tokens: 1024
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const reader = response?.body?.getReader();
            let receivedMessage = '';

            while (true) {
                const { done, value }: any = await reader?.read();
                if (done) break;
                receivedMessage += new TextDecoder().decode(value);
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage.role === 'assistant') {
                        return [...prev.slice(0, -1), { ...lastMessage, content: receivedMessage }];
                    } else {
                        return [...prev, { role: 'assistant', content: receivedMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
                    }
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ChatBotIcon isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed md:right-20 right-10 z-50 top-0 py-2 flex items-center h-full border flex-col md:w-[30vw] bg-white shadow-lg"
                >
                    <h1 className='py-2 font-bold px-8 mb-4 border-b border-gray-600 w-full'>
                        Ask Queries to chatbot
                    </h1>
                    <ScrollArea className="w-full px-6 flex-grow" ref={scrollAreaRef}>
                        <div className="w-full">
                            {messages.map((msg, index) => (
                                msg.role === 'user' ? (
                                    <ReceiverMessage key={index} name='You' message={msg.content} time={msg.time} pic="https://pagedone.io/asset/uploads/1704091591.png" />
                                ) : (
                                    <SenderMessage key={index} name='Chat Bot' message={msg.content} time={msg.time} pic="https://pagedone.io/asset/uploads/1710412177.png" />
                                )
                            ))}
                            {isLoading && <div className="text-left">Thinking...</div>}
                        </div>
                    </ScrollArea>
                    <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
                </motion.div>
            )}
        </>
    );
};

export default ChatBot;
