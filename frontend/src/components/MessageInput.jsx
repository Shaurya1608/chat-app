import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-3 md:p-6 border-t border-slate-700/30 bg-gradient-to-t from-slate-900/95 to-slate-800/80 backdrop-blur-xl">
      {imagePreview && (
        <div className="max-w-full md:max-w-3xl mx-auto mb-3 md:mb-4 flex items-center">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl border-2 border-slate-700/50 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 shadow-lg hover:scale-110 transition-all duration-200 touch-manipulation"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-full md:max-w-3xl mx-auto flex gap-2 md:gap-3 items-end">
        <div className="flex-1 relative min-w-0">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              isSoundEnabled && playRandomKeyStrokeSound();
            }}
            className="w-full bg-slate-800/70 border border-slate-700/50 rounded-2xl py-2.5 px-4 md:py-3 md:px-5 text-sm md:text-base text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-lg backdrop-blur-sm"
            placeholder="Type your message..."
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2.5 md:p-3 rounded-xl transition-all duration-200 shadow-lg touch-manipulation ${
            imagePreview
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 active:bg-cyan-500/40"
              : "bg-slate-800/70 text-slate-400 border border-slate-700/50 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-slate-700/70 active:bg-slate-700/80"
          }`}
          title="Attach image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2.5 md:p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25 disabled:shadow-none active:scale-95 touch-manipulation"
          title="Send message"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;