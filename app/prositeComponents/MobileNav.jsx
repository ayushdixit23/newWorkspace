import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { MdColorLens } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";

const MobileNav = ({ setValues }) => {
  return (
    <>
      <div>
        <div className="fixed bottom-0 bg-black h-20 left-0 w-full p-2">
          <div className="text-white flex justify-around w-full h-full items-center">
            <div
              onClick={() => setValues(1)}
              className="flex flex-col gap-1 justify-center items-center"
            >
              <div className="text-2xl">
                <MdColorLens />
              </div>
              <div className="text-sm">Templates</div>
            </div>
            <div
              onClick={() => setValues(2)}
              className="flex flex-col gap-1 justify-center items-center"
            >
              <div className="text-2xl">
                <MdColorLens />
              </div>
              <div className="text-sm">Elements</div>
            </div>
            <div
              onClick={() => setValues(3)}
              className="flex flex-col gap-1 justify-center items-center"
            >
              <div className="text-2xl">
                <PiTextTBold />
              </div>
              <div className="text-sm">Text</div>
            </div>
            <div
              onClick={() => setValues(4)}
              className="flex flex-col gap-1 justify-center items-center"
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

export default MobileNav;
