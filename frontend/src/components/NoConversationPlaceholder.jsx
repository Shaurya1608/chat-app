import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-24 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/10 border border-cyan-500/20">
        <MessageCircleIcon className="size-12 text-cyan-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-100 mb-3 drop-shadow-sm">Select a conversation</h3>
      <p className="text-slate-400 max-w-md text-[15px] leading-relaxed">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
      <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
    </div>
  );
};

export default NoConversationPlaceholder;