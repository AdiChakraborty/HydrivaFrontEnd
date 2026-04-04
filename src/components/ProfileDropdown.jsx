import { useRef, useEffect } from "react";

export default function ProfilePopover({ children, open, setOpen, onSignout, onProfileClick }) {
  const popoverRef = useRef();

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Profile Button */}
      {children}

      {/* Popover */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-xl shadow-lg p-2 z-50">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={onProfileClick}>
            Profile
          </button>

          <button className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-500 rounded-md cursor-pointer" onClick={onSignout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
