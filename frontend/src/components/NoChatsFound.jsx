
import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-5">
      <div className="size-20 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent rounded-3xl flex items-center justify-center shadow-xl shadow-cyan-500/10 border border-cyan-500/20">
        <MessageCircleIcon className="size-10 text-cyan-400" />
      </div>
      <div>
        <h4 className="text-slate-100 font-semibold text-lg mb-2 drop-shadow-sm">No conversations yet</h4>
        <p className="text-slate-400 text-sm px-6 leading-relaxed">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-5 py-2.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-xl hover:bg-cyan-500/20 hover:scale-105 transition-all duration-200 border border-cyan-500/20 hover:border-cyan-500/40 shadow-md hover:shadow-cyan-500/10"
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;
