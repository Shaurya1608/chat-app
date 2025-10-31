
import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound, isSidebarCollapsed, toggleSidebar } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

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
              onClick={logout}
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
              {/* COLLAPSED: Only Avatar and Collapse Button */}
              <div className="flex flex-col items-center gap-4 w-full">
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
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200 group"
                  onClick={toggleSidebar}
                  title="Expand sidebar"
                >
                  <ChevronRightIcon className="size-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* BUTTONS - Stacked vertically when collapsed */}
              <div className="flex flex-col gap-2 items-center w-full">
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
                
                <button
                  className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOutIcon className="size-5 group-hover:scale-110 transition-transform" />
                </button>
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
                  onClick={logout}
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
    </div>
  );
}
export default ProfileHeader;
