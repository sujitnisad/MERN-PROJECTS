import React from "react";
import { FaHandPeace } from "react-icons/fa";
import { TbRobot } from "react-icons/tb";
import { MdKeyboardArrowRight } from "react-icons/md";
function Header() {
  return (
    <div
      className="flex min-h-screen py-30 flex-col justify-center items-center"
      style={{
        backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
      }}
    >
      <TbRobot size={100} />
      <div className="flex justify-center gap-2 items-center mt-8">
        <FaHandPeace size={30} />
        <h1 className="text-3xl">Hello Developer !!</h1>
      </div>
      <div className="flex flex-col  gap-6 justify-center items-center mt-5">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
        <button className="flex items gap-2 border border-gray-500 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all">
          Get started
          <span className="pt-1.5">
            <MdKeyboardArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;
