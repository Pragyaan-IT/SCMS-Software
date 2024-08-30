// ChatInput.js
import { Send, UserCircle2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const ChatInput = ({ onSendMessage, isLoading }: any) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex w-11/12 items-center justify-between gap-2 rounded-3xl border py-1 pl-3 pr-1"
    >
      <div className="flex flex-grow items-center gap-2">
        <UserCircle2Icon size={20} />
        <Input
          className="w-full shrink grow text-xs font-medium leading-4 focus:outline-none"
          placeholder="Type here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-2">
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          {/* SVG path data */}
        </svg>
        <button
          type="submit"
          className="flex items-center rounded-full px-3 py-2 shadow"
          disabled={isLoading}
        >
          <Send size={16} color="#fff" />
          <h3 className="px-2 text-xs font-semibold leading-4">Send</h3>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
