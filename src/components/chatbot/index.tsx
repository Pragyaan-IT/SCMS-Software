"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ChatBotIcon from "./ChatBotIcon";
import ChatInput from "./ChatInput";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);
  const scrollAreaRef = useRef<any>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          "https://8100-01j6f35wcrtxm9mqx4xdkcv7wm.cloudspaces.litng.ai/analyze",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              student_data: {
                attendance: 84.0,
                marks: 89.4,
                questions_asked: 9,
                quiz_score: 77.1,
                avg_entry_time: 12.8
              }
            }),
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const reader = response?.body?.getReader();
        let receivedMessage = "";

        while (true) {
          const { done, value }: any = await reader.read();
          if (done) break;
          receivedMessage += new TextDecoder().decode(value);
        }

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: receivedMessage,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error while fetching the initial analysis.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    };
    if (!isInitialDataFetched) {
      fetchInitialData();
    }
  }, [isInitialDataFetched]);

  const sendMessage = async (content: any) => {
    if (!content.trim()) return;

    const newMessage = {
      role: "user",
      content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      content += " Not more than 50 words. Try to limit it to a small explanation.";
      const response = await fetch(
        "https://8100-01j6f35wcrtxm9mqx4xdkcv7wm.cloudspaces.litng.ai/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content }],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response?.body?.getReader();
      let receivedMessage = "";

      while (true) {
        const { done, value }: any = await reader.read();
        if (done) break;
        receivedMessage += new TextDecoder().decode(value);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: receivedMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <ChatBotIcon isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-10 top-0 z-50 flex h-full flex-col items-center border py-2 bg-background shadow-lg md:right-20 md:w-[30vw]"
        >
          <h1 className="mb-4 w-full border-b px-8 py-2 font-bold">
            Ask Queries to chatbot
          </h1>
          <ScrollArea className="w-full flex-grow px-6" ref={scrollAreaRef}>
            <div className="w-full">
              {messages.map((msg, index) =>
                msg.role === "user" ? (
                  <ReceiverMessage
                    key={index}
                    name="You"
                    message={msg.content}
                    time={msg.time}
                    pic="https://pagedone.io/asset/uploads/1704091591.png"
                  />
                ) : (
                  <SenderMessage
                    key={index}
                    name="Chat Bot"
                    message={msg.content}
                    time={msg.time}
                    pic="https://pagedone.io/asset/uploads/1710412177.png"
                  />
                )
              )}
              {isLoading && <div className="text-left">Thinking...</div>}
            </div>
          </ScrollArea>
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;
