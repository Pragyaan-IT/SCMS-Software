import { MessageCircle, X } from "lucide-react";
import { Button } from "../ui/button";

interface ChatBotIconProps {
  handleClick: () => void;
  isOpen: boolean;
}

const ChatBotIcon = ({ handleClick, isOpen }: ChatBotIconProps) => {
  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-4 right-2 m-0 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-0 text-sm font-medium normal-case leading-5 disabled:pointer-events-none disabled:opacity-50 md:right-4 md:h-16 md:w-16"
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      data-state="closed"
    >
      {!isOpen ? (
        <MessageCircle size={20} />
      ) : (
        <X size={24} />
      )}
    </Button>
  );
};

export default ChatBotIcon;
