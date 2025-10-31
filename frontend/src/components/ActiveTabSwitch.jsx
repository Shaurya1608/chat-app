import { useChatStore } from "../store/useChatStore";

import { MessageCircleIcon, UsersIcon } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab, isSidebarCollapsed } = useChatStore();

  // On mobile, always show expanded layout regardless of collapsed state
  // On desktop, respect the collapsed state
  const shouldShowCollapsed = isSidebarCollapsed;

  if (shouldShowCollapsed) {
    // Show collapsed layout only on desktop (hidden on mobile)
    return (
      <>
        {/* Mobile: Always show expanded */}
        <div className="flex md:hidden gap-2 p-2 md:p-3 mx-3 md:mx-4 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/30">
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 touch-manipulation active:scale-95 ${
              activeTab === "chats"
                ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 active:bg-slate-700/40"
            }`}
          >
            Chats
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 touch-manipulation active:scale-95 ${
              activeTab === "contacts"
                ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 active:bg-slate-700/40"
            }`}
          >
            Contacts
          </button>
        </div>
        
        {/* Desktop: Show collapsed */}
        <div className="hidden md:block">
          <div className="flex flex-col gap-2 p-3 mx-2 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/30">
            <button
              onClick={() => setActiveTab("chats")}
              className={`p-3 rounded-lg transition-all duration-300 relative group ${
                activeTab === "chats"
                  ? "bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
              }`}
              title="Chats"
            >
              <MessageCircleIcon className="size-5 mx-auto" />
              {activeTab === "chats" && (
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-l-full"></div>
              )}
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 text-slate-100 text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-700">
                Chats
              </div>
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`p-3 rounded-lg transition-all duration-300 relative group ${
                activeTab === "contacts"
                  ? "bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
              }`}
              title="Contacts"
            >
              <UsersIcon className="size-5 mx-auto" />
              {activeTab === "contacts" && (
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-l-full"></div>
              )}
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 text-slate-100 text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-700">
                Contacts
              </div>
            </button>
          </div>
        </div>
      </>
    );
  }

  // Expanded layout (default for mobile, or when not collapsed on desktop)
  return (
    <div className="flex gap-2 p-2 md:p-3 mx-3 md:mx-4 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/30">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 touch-manipulation active:scale-95 ${
          activeTab === "chats"
            ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 active:bg-slate-700/40"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 py-2 md:py-2.5 px-3 md:px-4 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 touch-manipulation active:scale-95 ${
          activeTab === "contacts"
            ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/10 border border-cyan-500/30"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 active:bg-slate-700/40"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;