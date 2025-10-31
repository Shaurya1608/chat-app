import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, isSidebarCollapsed } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className={`group bg-slate-700/20 hover:bg-slate-700/40 active:bg-slate-700/50 rounded-xl cursor-pointer transition-all duration-300 border border-slate-700/30 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 backdrop-blur-sm relative touch-manipulation ${
            // On mobile, always show expanded. On desktop, respect collapsed state
            isSidebarCollapsed ? 'p-3 md:p-3 md:flex md:justify-center' : 'p-3 md:p-4'
          }`}
          onClick={() => setSelectedUser(contact)}
        >
          {/* Mobile: Always show expanded layout */}
          <div className="flex md:hidden items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"} relative`}>
              <div className="size-10 rounded-full ring-2 ring-slate-600/50 group-hover:ring-cyan-500/50 transition-all duration-300 overflow-hidden shadow-md">
                <img 
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-semibold truncate group-hover:text-cyan-300 transition-colors">
                {contact.fullName}
              </h4>
              {onlineUsers.includes(contact._id) && (
                <p className="text-xs text-green-400 mt-0.5 font-medium">Active now</p>
              )}
            </div>
          </div>
          
          {/* Desktop: Show collapsed or expanded based on state */}
          <div className="hidden md:block">
          {isSidebarCollapsed ? (
            <>
              <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"} relative`}>
                <div className="size-10 rounded-full ring-2 ring-slate-600/50 group-hover:ring-cyan-500/50 transition-all duration-300 overflow-hidden shadow-md">
                  <img 
                    src={contact.profilePic || "/avatar.png"}
                    alt={contact.fullName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-slate-100 text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-700">
                <div className="font-semibold">{contact.fullName}</div>
                {onlineUsers.includes(contact._id) && (
                  <div className="text-xs text-green-400 mt-1">Active now</div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"} relative`}>
                <div className="size-10 md:size-12 rounded-full ring-2 ring-slate-600/50 group-hover:ring-cyan-500/50 transition-all duration-300 overflow-hidden shadow-md">
                  <img 
                    src={contact.profilePic || "/avatar.png"}
                    alt={contact.fullName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-100 font-semibold truncate group-hover:text-cyan-300 transition-colors">
                  {contact.fullName}
                </h4>
                {onlineUsers.includes(contact._id) && (
                  <p className="text-xs text-green-400 mt-0.5 font-medium">Active now</p>
                )}
              </div>
            </div>
          )}
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;