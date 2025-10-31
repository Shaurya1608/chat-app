import { useEffect, useRef, useCallback, memo } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

// Memoized Message Component for better performance
const MessageBubble = memo(({ msg, authUser }) => {
  return (
    <div
      className={`flex ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[85%] md:max-w-[75%] lg:max-w-[65%] rounded-2xl px-3 py-2 md:px-4 md:py-2.5 shadow-lg ${
          msg.senderId === authUser._id
            ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-br-sm"
            : "bg-slate-800/90 text-slate-100 rounded-bl-sm border border-slate-700/50"
        }`}
      >
        {msg.image && (
          <img 
            src={msg.image} 
            alt="Shared" 
            loading="lazy"
            className="rounded-xl h-48 w-full object-cover mb-2 border border-black/10" 
          />
        )}
        {msg.text && (
          <p className={`text-sm md:text-[15px] leading-relaxed ${msg.image ? 'mt-2' : ''} whitespace-pre-wrap break-words`}>
            {msg.text}
          </p>
        )}
        <div className={`flex items-center justify-end gap-1 mt-1.5 ${
          msg.senderId === authUser._id ? 'text-cyan-50/70' : 'text-slate-400'
        }`}>
          <span className="text-[11px] font-medium">
            {new Date(msg.createdAt).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const shouldAutoScrollRef = useRef(true);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    shouldAutoScrollRef.current = true;

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  // Check if user is near bottom to determine if we should auto-scroll
  const checkIfNearBottom = useCallback(() => {
    if (!scrollContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const threshold = 100; // pixels from bottom
    return scrollHeight - scrollTop - clientHeight < threshold;
  }, []);

  // Handle scroll events
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      isScrollingRef.current = true;
      shouldAutoScrollRef.current = checkIfNearBottom();
      
      // Clear the flag after scroll ends
      clearTimeout(scrollContainer.scrollTimeout);
      scrollContainer.scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollContainer.scrollTimeout);
    };
  }, [checkIfNearBottom]);

  // Auto-scroll only if user is at bottom and not manually scrolling
  useEffect(() => {
    if (messages.length > 0 && shouldAutoScrollRef.current && !isScrollingRef.current && messageEndRef.current) {
      requestAnimationFrame(() => {
        if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, [messages.length]);

    
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div 
        ref={scrollContainerRef}
        className="flex-1 px-3 md:px-6 overflow-y-auto py-4 md:py-8 custom-scrollbar scroll-smooth"
        style={{ 
          willChange: 'scroll-position',
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      >
        {messages.length > 0 && !isMessagesLoading? (
          <div className="max-w-full md:max-w-3xl mx-auto space-y-3 md:space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg._id} msg={msg} authUser={authUser} />
            ))}
            {/* 👇 scroll target */}
             <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? <MessagesLoadingSkeleton />: (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;



  
