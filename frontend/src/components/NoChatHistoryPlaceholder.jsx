import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/10 border border-cyan-500/20">
        <MessageCircleIcon className="size-10 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-3 drop-shadow-sm">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-6">
        <p className="text-slate-400 text-[15px] leading-relaxed">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mx-auto"></div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <button className="px-5 py-2.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 hover:scale-105 transition-all duration-200 border border-cyan-500/20 hover:border-cyan-500/40 shadow-md hover:shadow-cyan-500/10">
          👋 Say Hello
        </button>
        <button className="px-5 py-2.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 hover:scale-105 transition-all duration-200 border border-cyan-500/20 hover:border-cyan-500/40 shadow-md hover:shadow-cyan-500/10">
          🤝 How are you?
        </button>
        <button className="px-5 py-2.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 hover:scale-105 transition-all duration-200 border border-cyan-500/20 hover:border-cyan-500/40 shadow-md hover:shadow-cyan-500/10">
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;