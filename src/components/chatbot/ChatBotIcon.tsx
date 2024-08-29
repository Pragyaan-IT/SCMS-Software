import { MessageCircle, X } from "lucide-react";

interface ChatBotIconProps {
    handleClick: () => void;
    isOpen: boolean;
}

const ChatBotIcon = ({ handleClick, isOpen }: ChatBotIconProps) => {
    return (
        <button onClick={handleClick}
            className="fixed bottom-4 md:right-4 right-2 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full md:w-16 md:h-16 h-12 w-12 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
            type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
                {
                    !isOpen ? <MessageCircle size={20} color="#fff" /> : <X size={24} color="#fff" />
                }
        </button>
    )
}

export default ChatBotIcon