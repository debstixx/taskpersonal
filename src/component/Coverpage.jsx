import React, { useState } from "react";
import Navlogo from "../assets/nav-logo.png";
import NavImg from "../assets/nav-img.png";
import heroImg from "../assets/hero-img.png";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Coverpage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className='"bg-gray-900 shadow-md border-b-stone-500 w-full z-30'>
        <div className="container mx-auto w-11/12 px-2 py-2 flex justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
                <span>
                  <img
                    src={Navlogo}
                    className="w-[32px] md:w-[39.91px] md:h-[41px]"
                  />
                </span>
                <Link to="/"><h1 className="font-semibold text-xl md:text-3xl md:w-[128px] md:h-[34px] text-blue-900 font-['Signika_Negative'] ">
                  TaskDuty
                </h1></Link>
          </div>
          <div className="hidden md:flex gap-6 items-center">
              <Link to="/login"><h1 className="font-['Signika_Negative'] text-[rgba(151,79,208,1)] text-base font-medium border rounded py-1 px-4 hover:text-white hover:bg-[rgba(151,79,208,1)] cursor-pointer">
                Log In
              </h1></Link>
              <Link to="/register"><h1 className="font-['Signika_Negative'] text-[rgba(151,79,208,1)] text-base font-medium border rounded py-1 px-4 hover:text-white hover:bg-[rgba(151,79,208,1)] cursor-pointer">
                Register
              </h1></Link>
              <span>
                <img src={NavImg} className="w-[60px] h-[60px]" />
              </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-blue-900"
          >
            {isOpen ? <X size={34} /> : <Menu size={34} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden flex flex-col items-center bg-purple-400 py-2 space-y-2">
           <Link to="/login"><h1 className="text-sm text-[rgba(151,79,208,1)] font-['Signika_Negative,_sans-serif'] border rounded bg-white py-1 px-3 cursor-pointer">Log In</h1></Link>
            <Link to="/register"><h1 className="text-sm text-[rgba(151,79,208,1)] font-['Signika_Negative,_sans-serif'] border rounded bg-white py-1 px-3 cursor-pointer">Register</h1></Link>
          </div>
        )}
      </nav>
      <div className="container mx-auto w-11/12 px-4 py-4 md:mt-4 flex flex-col gap-4 md:flex-row md:justify-between items-center">
          <div className="flex flex-col">
              <h1 className="pt-8 text-2xl md:text-5xl md:font-medium font-['Signika_Negative'] md:w-[470px] md:h-[153px]">Manage your Tasks on
                <br />
                <span className="text-purple-500 text-lg md:text-3xl">
                  TaskDuty
                </span>
              </h1>
              <p className="text-base md:w-[495px] md:text-2xl md:font-normal font-['Signika_Negative'] text-[rgba(115,113,113,1)]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
                sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
                tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
                semper porttitor. Nec accumsan.
              </p>
              
              <Link to="/login"><button className="text-white text-sm mt-3 p-1 w-[50%] md:text-xl md:w-[40%] md:mt-3 bg-purple-500 md:px-3 md:py-2 rounded-lg border-2">
                Go to My Tasks
              </button></Link>
          </div>
        <div>
          <span>
            <img src={heroImg} className="w-[280px] md:w-[395px]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Coverpage;
