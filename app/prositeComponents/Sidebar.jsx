import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { MdColorLens } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
const Sidebar = ({ setValues }) => {
  return (
    <>
      <div>
        <div className="w-24 min-h-screen  bg-black text-white p-2">
          <div className="flex flex-col justify-center items-center h-[85vh] gap-10">
            <div
              onClick={() => setValues(1)}
              className="flex flex-col gap-1 z-10 justify-center items-center"
            >
              <div className="text-2xl">
                <MdColorLens />
              </div>
              <div className="text-sm">Templates</div>
            </div>
            <div
              onClick={() => setValues(2)}
              className="flex flex-col z-10  gap-1 justify-center items-center"
            >
              <div className="text-2xl">
                <MdColorLens />
              </div>
              <div className="text-sm">Elements</div>
            </div>
            <div
              onClick={() => setValues(3)}
              className="flex flex-col gap-1 z-10 justify-center items-center"
            >
              <div className="text-2xl">
                <PiTextTBold />
              </div>
              <div className="text-sm">Text</div>
            </div>

            <div
              onClick={() => setValues(4)}
              className="flex flex-col z-10 gap-1 justify-center items-center"
            >
              <div className="text-2xl">
                <AiOutlineSetting />
              </div>
              <div className="text-sm">Setting</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
