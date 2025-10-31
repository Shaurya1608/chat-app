
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, ChevronLeftIcon, ChevronRightIcon, AlertTriangleIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

// Logout Confirmation Modal Component
function LogoutModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700/50 shadow-2xl relative transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-red-500/20 flex-shrink-0">
            <AlertTriangleIcon className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100">Confirm Logout</h3>
        </div>
        
        <p className="text-slate-300 mb-6 leading-relaxed">
          Are you sure you want to logout? You'll need to log in again to access your account.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 font-medium shadow-lg shadow-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound, isSidebarCollapsed, toggleSidebar } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fileInputRef = useRef(null);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className={`border-b border-slate-700/30 bg-gradient-to-r from-slate-800/50 to-slate-800/30 backdrop-blur-sm transition-all duration-300 ${
      isSidebarCollapsed ? 'p-4' : 'p-4 md:p-6'
    }`}>
      <div className={`flex items-center justify-between ${isSidebarCollapsed ? 'flex-col gap-4 md:flex-row md:gap-0' : ''}`}>
        {/* On mobile, always show expanded layout. On desktop, check collapsed state */}
        {/* Show collapsed layout only on desktop when collapsed */}
        <div className="flex md:hidden w-full">
          {/* MOBILE: Always Expanded Layout */}
          <div className="flex items-center gap-4 flex-1 w-full">
            <div className="avatar online">
              <button
                className="size-12 md:size-14 rounded-full overflow-hidden relative group ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300 shadow-lg"
                onClick={() => fileInputRef.current.click()}
              >
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="User image"
                  className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <span className="text-white text-xs font-medium drop-shadow-lg">Change</span>
                </div>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-slate-100 font-semibold text-base md:text-lg max-w-[180px] truncate drop-shadow-sm">
                {authUser.fullName}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <p className="text-slate-400 text-xs font-medium">Online</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
              onClick={handleLogoutClick}
              title="Logout"
            >
              <LogOutIcon className="size-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              className="p-2.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 group"
              onClick={() => {
                mouseClickSound.currentTime = 0;
                mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                toggleSound();
              }}
              title={isSoundEnabled ? "Disable sound" : "Enable sound"}
            >
              {isSoundEnabled ? (
                <Volume2Icon className="size-5 group-hover:scale-110 transition-transform" />
              ) : (
                <VolumeOffIcon className="size-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>
        
        {/* DESKTOP: Show collapsed or expanded based on state */}
        <div className="hidden md:flex items-center justify-between w-full">
          {isSidebarCollapsed ? (
            <>
              {/* COLLAPSED: Avatar, Collapse Button, and Action Buttons */}
              <div className="flex flex-col items-center gap-3 w-full">
                {/* Avatar */}
                <div className="avatar online">
                  <button
                    className="size-12 rounded-full overflow-hidden relative group ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300 shadow-lg"
                    onClick={() => fileInputRef.current.click()}
                    title={authUser.fullName}
                  >
                    <img
                      src={selectedImg || authUser.profilePic || "/avatar.png"}
                      alt="User image"
                      className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                {/* COLLAPSE BUTTON */}
                <button
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200 group w-full flex items-center justify-center"
                  onClick={toggleSidebar}
                  title="Expand sidebar"
                >
                  <ChevronRightIcon className="size-4 group-hover:scale-110 transition-transform" />
                </button>

                {/* ACTION BUTTONS - Stacked vertically when collapsed */}
                <div className="flex flex-col gap-2 items-center w-full mt-2">
                  {/* SOUND TOGGLE BTN */}
                  <button
                    className="p-2.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 group w-full flex items-center justify-center"
                    onClick={() => {
                      mouseClickSound.currentTime = 0;
                      mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                      toggleSound();
                    }}
                    title={isSoundEnabled ? "Disable sound" : "Enable sound"}
                  >
                    {isSoundEnabled ? (
                      <Volume2Icon className="size-5 group-hover:scale-110 transition-transform" />
                    ) : (
                      <VolumeOffIcon className="size-5 group-hover:scale-110 transition-transform" />
                    )}
                  </button>
                  
                  {/* LOGOUT BTN */}
                  <button
                    className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group w-full flex items-center justify-center"
                    onClick={handleLogoutClick}
                    title="Logout"
                  >
                    <LogOutIcon className="size-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* EXPANDED: Full Layout */}
              <div className="flex items-center gap-4 flex-1">
                {/* AVATAR */}
                <div className="avatar online">
                  <button
                    className="size-14 rounded-full overflow-hidden relative group ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300 shadow-lg"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <img
                      src={selectedImg || authUser.profilePic || "/avatar.png"}
                      alt="User image"
                      className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      <span className="text-white text-xs font-medium drop-shadow-lg">Change</span>
                    </div>
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* USERNAME & ONLINE TEXT */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-slate-100 font-semibold text-lg max-w-[180px] truncate drop-shadow-sm">
                    {authUser.fullName}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                    <p className="text-slate-400 text-xs font-medium">Online</p>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 items-center">
                {/* COLLAPSE BUTTON */}
                <button
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200 group"
                  onClick={toggleSidebar}
                  title="Collapse sidebar"
                >
                  <ChevronLeftIcon className="size-4 group-hover:scale-110 transition-transform" />
                </button>

                {/* LOGOUT BTN */}
                <button
                  className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
                  onClick={handleLogoutClick}
                  title="Logout"
                >
                  <LogOutIcon className="size-5 group-hover:scale-110 transition-transform" />
                </button>

                {/* SOUND TOGGLE BTN */}
                <button
                  className="p-2.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 group"
                  onClick={() => {
                    mouseClickSound.currentTime = 0;
                    mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                    toggleSound();
                  }}
                  title={isSoundEnabled ? "Disable sound" : "Enable sound"}
                >
                  {isSoundEnabled ? (
                    <Volume2Icon className="size-5 group-hover:scale-110 transition-transform" />
                  ) : (
                    <VolumeOffIcon className="size-5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
export default ProfileHeader;
