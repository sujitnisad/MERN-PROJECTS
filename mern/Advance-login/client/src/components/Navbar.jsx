import React from "react";
import { AiOutlineLinux } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="w-full flex justify-end items-center sm:p-4 sm:px-12 sticky top-0 shadow">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-3 py-1 text-gray-800 hover:bg-gray-100 transition-all text-sm" // Reduced padding and font size
        >
          Login
          <span className="pt-0.9">
            <MdKeyboardArrowRight />
          </span>
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
