"use client";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { memo } from "react";

export default function MainLayout({ children }) {
  const MemorizedNav = memo(NavBar);
  const MemorizedHeader = memo(Header);
  return (
    <div>
      <div className=" bg-[#f1f1f1] vs:max-sm:h-[95.5vh] duration-75 h-screen w-screen flex overflow-auto scrollbar-hide ">
        <div className=" h-full z-10">
          <MemorizedNav />
        </div>
        <div className="w-full overflow-y-scroll scrollbar-hide bg-[#f9f9f9] h-full sm:p-4 ">
          <div className="sm:hidden fixed w-full shadow-sm z-10">
            <MemorizedHeader />
          </div>
          <div className="">
            <div className="pn:max-sm:hidden flex justify-center items-center">
              <MemorizedHeader />
            </div>

            <div className="z-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
