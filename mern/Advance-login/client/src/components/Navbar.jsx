import React from "react";
import { AiOutlineLinux } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center  sm:p-6 sm:px-24 absolute top-0">
      <button className="flex items- gap-2 border border-gray-500 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all">
        sign in
        <span className="pt-1">
          <MdKeyboardArrowRight />
        </span>
      </button>
    </nav>
  );
}

export default Navbar;
