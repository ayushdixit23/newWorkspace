"use client";
import React, { useEffect, useState } from "react";
import { LiaToggleOnSolid } from "react-icons/lia";
import { GrAdd } from "react-icons/gr";

const Common = ({ values }) => {
  const [slide, setSlide] = useState(null);

  useEffect(() => {
    setSlide(values);
    // console.log(slide);
  }, [values]);
  return (
    <>
      {/* <div className="relative">
        <div
          className={`absolute w-full duration-[10000] top-0 ${
            slide === 1 ? "left-0" : "-left-[600px]"
          }`}
        > */}
      <div className="sm:w-[400px] w-screen h-screen bg-[#252627] text-white p-3">
        <div className="flex flex-col my-4 gap-3">
          <div className="font-semibold">
            <div>Edit Section</div>
          </div>
          <div className="flex flex-col gap-4 my-3">
            <div className="flex flex-col w-full">
              <div className="font-semibold">Show About Section</div>
              <div className="flex w-full justify-between items-center">
                <div className="text-sm max-w-[90%]">
                  Display a link to a screen with basic information about you.
                </div>

                <LiaToggleOnSolid className="text-2xl" />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="font-semibold">Show Store Section</div>
              <div className="flex w-full justify-between items-center">
                <div className="text-sm max-w-[90%]">Display your products</div>
                <div>
                  <LiaToggleOnSolid className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="font-semibold">Show Community Section</div>
              <div className="flex w-full justify-between items-center">
                <div className="text-sm max-w-[90%]">
                  Display your community with others
                </div>
                <div>
                  <LiaToggleOnSolid className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div
                className="bg-white w-6 h-6 rounded-xl flex justify-center items-center
			"
              >
                <div>
                  <GrAdd />
                </div>
              </div>
              <div>Add a new</div>
            </div>
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default Common;
