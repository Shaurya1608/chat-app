
import { XIcon, ArrowLeftIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center bg-gradient-to-r from-slate-800/60 to-slate-800/40 backdrop-blur-xl border-b border-slate-700/30 h-[60px] md:h-[84px] px-4 md:px-6 shadow-lg"
    >
      <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
        {/* Back Button - Mobile Only */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200 mr-2"
          title="Back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className={`avatar ${isOnline ? "online" : "offline"} relative flex-shrink-0`}>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-slate-600/50 overflow-hidden shadow-md">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-slate-100 font-semibold text-base md:text-lg drop-shadow-sm truncate">
            {selectedUser.fullName}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            {isOnline ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50 flex-shrink-0"></div>
                <p className="text-green-400 text-xs md:text-sm font-medium">Online</p>
              </>
            ) : (
              <p className="text-slate-400 text-xs md:text-sm font-medium">Offline</p>
            )}
          </div>
        </div>
      </div>

      {/* Close Button - Desktop Only (Mobile uses back button) */}
      <button 
        onClick={() => setSelectedUser(null)}
        className="hidden md:flex p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200 group"
        title="Close chat"
      >
        <XIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
export default ChatHeader;
