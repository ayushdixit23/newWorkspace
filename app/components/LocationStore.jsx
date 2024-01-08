import React from "react";
import { FaAngleDown } from "react-icons/fa";

const LocationStore = () => {
  return (
    <>
      <div>
        <div className="flex justify-between px-3 items-center">
          <div className="text-lg font-semibold">Top Location</div>
          <div className="flex justify-center p-2 rounded-xl gap-1 border px-3 items-center">
            <div>Towns/Cities</div>
            <div>
              <FaAngleDown />
            </div>
          </div>
        </div>
        <div className="my-3 flex flex-col gap-4">
          <div className="px-2 flex flex-col gap-1">
            <div className="text-sm text-[#615E83]">Kanpur</div>
            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
              <div
                style={{ width: "70%" }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
              ></div>
            </div>
          </div>
          <div className="px-2 flex flex-col gap-1">
            <div className="text-sm text-[#615E83]">Lucknow</div>
            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
              <div
                style={{ width: "70%" }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
              ></div>
            </div>
          </div>
          <div className="px-2 flex flex-col gap-1">
            <div className="text-sm text-[#615E83]">Delhi</div>
            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
              <div
                style={{ width: "70%" }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationStore;
