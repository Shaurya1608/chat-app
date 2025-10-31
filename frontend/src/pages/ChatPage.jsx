import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const {activeTab, selectedUser, isSidebarCollapsed} = useChatStore();
   return (
    <div className="relative w-full h-screen overflow-hidden">
      <BorderAnimatedContainer>
        <div className="flex w-full h-full">
          {/* LEFT SIDE - Chat List / Sidebar */}
          {/* Mobile: Hidden when chat is selected, Full width when no chat selected */}
          {/* Desktop: Always visible */}
          <div className={`bg-gradient-to-b from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl flex flex-col border-r border-slate-700/30 shadow-2xl transition-all duration-300 flex-shrink-0 ${
            // Mobile: hide if chat selected, show if no chat
            selectedUser 
              ? 'hidden md:flex' 
              : 'flex w-full'
          } ${
            // Desktop: handle collapse state (works whether user is selected or not)
            isSidebarCollapsed ? 'md:w-20' : 'md:w-80'
          }`}>
            <ProfileHeader />
            <ActiveTabSwitch />

            <div 
              className={`flex-1 overflow-y-auto space-y-2 custom-scrollbar transition-all duration-300 ${
                // On mobile, always use full padding. On desktop, respect collapsed state
                isSidebarCollapsed ? 'p-4 md:p-2' : 'p-4'
              }`}
              style={{ 
                willChange: 'scroll-position',
                transform: 'translateZ(0)'
              }}
            >
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE - Chat View */}
          {/* Mobile: Full width when chat selected, hidden when no chat */}
          {/* Desktop: Always visible */}
          <div className={`flex-1 flex flex-col bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/95 backdrop-blur-xl min-w-0 ${
            selectedUser ? 'flex' : 'hidden md:flex'
          }`}>
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage