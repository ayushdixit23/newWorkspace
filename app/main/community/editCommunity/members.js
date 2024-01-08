import React from "react";
function members({ membersdata }) {

  return (
    <div className=" h-[100%] px-4 pt-4 space-y-4">
      <div className="flex justify-between py-2  sm:px-80 items-center ">
        <div className="flex justify-around space-x-6 items-center ">
          <img
            src={membersdata?.d}
            alt="dp"
            height={100}
            width={100}
            className="sm:h-16 sm:w-16 h-14 w-14 rounded-[20px] sm:rounded-[30px]"
          />
          <div>
            <div className="font-semibold text-[14px] sm:text-[18px]">
              {membersdata?.c?.fullname}
            </div>
            <div className="text-gray-400 text-[12px] sm:text-[16px]">
              {membersdata?.c?.username}
            </div>
          </div>
        </div>
        <div className="text-gray-400">Message</div>
      </div>
    </div>
  );
}

export default members;
