
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react"; // Optional: icon for Compose
import ComposeEmail from "./ComposeMail";
import MessageView from "./MessageView";

export default function EmailLayout() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleComposeClick = () => {
    setSelectedEmail(null);
    setIsComposing(true);
  };

  useEffect(() => {
    if (selectedEmail) {
      setIsComposing(false);
    }
  }, [selectedEmail]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Left Panel */}
      <div className="w-[35%] border-r border-gray-200 bg-white overflow-y-auto">
        <Outlet context={{ selectedEmail, setSelectedEmail }} />
      </div>

      {/* Right Panel */}
      <div className="w-[65%] bg-gray-100 overflow-y-auto relative p-6 shadow-inner">
        {/* Compose Button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={handleComposeClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition"
          >
            <Pencil size={18} />
            Compose
          </button>
        </div>

        {/* Right Content Area */}
        <div className="pt-20 h-full">
          {isComposing ? (
            <ComposeEmail onCancel={() => setIsComposing(false)} />
          ) : selectedEmail ? (
            <MessageView email={selectedEmail} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
              No email selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
