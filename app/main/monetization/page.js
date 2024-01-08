"use client"
import React, { useState } from "react";
import { BiRupee } from "react-icons/bi";
import { BsWallet, BsBank2 } from "react-icons/bs";
import {
  RiAddCircleLine,
  RiSettingsLine,
  RiDeleteBin6Line,
} from "react-icons/ri";


function page() {
  const [pay, setPay] = useState("999");
  return (
    <div>
      <div className="pt-1 pb-10">
        <div className="flex justify-between items-center">
          <div className="font-medium pl-4 text-[18px]  text-[#8B8D97] ">
            Monetization
          </div>
        </div>
        <div className="flex justify-start items-center space-x-10 pl-4">
          <div className="flex items-center bg-white rounded-2xl shadow-xl gap-4  justify-center w-96 h-28">
            <div className="bg-green-200 rounded-full p-2">
              <BiRupee className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-[#3e3e3e]">Total Revenue</div>
              <div className="flex flex-row items-center">
                <BiRupee className="w-[20px] h-[20px]" />
                <span className="font-semibold text-[20px]">10010100</span>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-2xl shadow-xl gap-2 justify-center w-96 h-28">
            <div className="bg-blue-200 rounded-full p-2">
              <BsWallet className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-[#3e3e3e]">Pending Payments</div>
              <div className="flex flex-row items-center">
                <BiRupee className="w-[20px] h-[20px]" />
                <span className="font-semibold text-[20px]">10010100</span>
              </div>
            </div>
          </div>
          <div className="bg-black rounded-2xl shadow-xl w-96 h-28">
            <div className="h-[40%] flex justify-between items-center px-2">
              <div className="text-[#fff]">Add Bank</div>
              <RiAddCircleLine className="h-6 w-6 text-white" />
            </div>
            <div className="flex h-[60%] bg-white w-full rounded-2xl justify-between items-center px-4">
              <div className="flex gap-2">
                <BsBank2 className="h-6 w-6 text-[#3e3e3e]" />
                <span>16737892346</span>
              </div>
              <div className="flex gap-2">
                <RiSettingsLine className="h-6 w-6 text-green-400" />
                <RiDeleteBin6Line className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center space-x-10 pl-4 pt-6">
          <div className="flex flex-col bg-white rounded-2xl shadow-xl gap-4 p-4 w-96 h-28">
            <div className="w-full">
              <div className="text-[#3e3e3e]">Total Sales From Store</div>
              <div className="w-full h-[1px] rounded-full bg-[#c0c0c0] mt-2"></div>
            </div>
            <div className="flex flex-row items-center">
              <BiRupee className="w-[20px] h-[20px]" />
              <span className="font-semibold text-[20px]">10010100</span>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-2xl shadow-xl gap-4 p-4 w-96 ">
            <div className="w-full">
              <div className="text-[#3e3e3e]">Paid Topics</div>
              <div className="w-full h-[1px] rounded-full bg-[#c0c0c0] mt-2"></div>
            </div>
            <div className="flex flex-row items-center">
              <BiRupee className="w-[20px] h-[20px]" />
              <span className="font-semibold text-[20px]">10010100</span>
            </div>
            <div className="w-full h-[1px] rounded-full bg-[#c0c0c0] mt-2"></div>
            <div>
              <div className="">
                community
                <div className="flex gap-1">
                  <div className="font-semibold">topic 1 : </div>
                  <div>₹5000</div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="font-semibold">CPM (Cost Per Mille) : </div>
                  <div>₹4000</div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="font-semibold">CPC (Cost Per Click) : </div>
                  <div>₹3000</div>
                </div>
              </div>
              <div className="w-full h-[1px] rounded-full bg-[#c0c0c0] mt-2"></div>
            </div>
            <div className="text-blue-500 font-medium">View More ...</div>
          </div>

          <div className="flex flex-col bg-white rounded-2xl shadow-xl gap-4 p-4 w-96 h-[100%]">
            <div className="w-full">
              <div className="text-[#3e3e3e]">Ad revenue</div>
              <div className="w-full h-[1px] rounded-full bg-[#c0c0c0] mt-2"></div>
            </div>
            <div className="flex flex-row items-center">
              <BiRupee className="w-[20px] h-[20px]" />
              <span className="font-semibold text-[20px]">10010100</span>
            </div>
            <div className="w-full h-[1px] rounded-full bg-[#c0c0c0] mt-2"></div>
            <div>
              <div className="">
                <div className="flex gap-1">
                  <div className="font-semibold">Impressions : </div>
                  <div>₹5000</div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="font-semibold">CPM (Cost Per Mille) : </div>
                  <div>₹4000</div>
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="font-semibold">CPC (Cost Per Click) : </div>
                  <div>₹3000</div>
                </div>
              </div>
              <div className="w-full h-[1px] rounded-full bg-[#c0c0c0] mt-2"></div>
            </div>
            <div className="text-blue-500 font-medium">
              90% The percentage of ad revenue that creator will receive
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="p-3 flex flex-col gap-4">
    //   <button className="bg-black text-white p-2 px-8 rounded-lg max-w-[150px]">
    //     0
    //   </button>
    //   <button className="bg-black text-white p-2 px-8 rounded-lg max-w-[150px]">
    //     499
    //   </button>
    //   <button className="bg-black text-white p-2 px-8 rounded-lg max-w-[150px]">
    //     999{" "}
    //   </button>
    // </div>
  );
}

export default page;
