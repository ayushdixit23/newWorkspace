"use client";
// import { API } from "@/Essentials";
import { communityDataSend } from "@/app/redux/slice/CommunityData";
// import { editcom } from "@/app/redux/slice/editcommunity";
// import { communityforid } from "@/app/redux/slice/userData";
// import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsXLg } from "react-icons/bs";
// import { FiEdit3 } from "react-icons/fi";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { encryptaes } from "@/app/utils/security";

function Communitybox({ data, id, index, handleDelete }) {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  // const href = `/main/community/editCommunity?id=${id}&comid=${data?.c?._id}`;
  const dispatch = useDispatch()
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`${open ? "fixed inset-0 z-10" : "-z-40"}`}
      ></div>
      <div
        className={`px-4 sm:bg-[#ffffff] sm:shadow-sm hover:bg-[#f9f9f9] py-5 bg-[#fff] duration-75 
          `}
      >
        <div className="flex relative items-center w-full justify-between font-semibold ">

          <div className="flex items-center gap-3 sm:gap-4 px-3 w-64 sm:max-md:w-52">
            <img
              src={data?.dps}
              alt="dp"
              height={100}
              width={100}
              className="h-14 w-14 cursor-pointer border border-[#f1f1f1] flex justify-center items-center rounded-[24px] ring-1 ring-white"
            />
            <div>
              <div className="md:w-36 sm:max-md:w-24 font-medium">
                {data?.c?.title}
              </div>
              <div className="sm:hidden text-[12px] font-medium">
                {"by "}
                {data?.c?.creator?.fullname}
              </div>
            </div>
          </div>
          <div className="vs:max-sm:hidden text-center justify-center flex sm:max-md:w-20 w-36 ">{data?.c?.topics?.length}</div>
          <div className="vs:max-sm:hidden justify-center sm:max-md:w-24 flex w-36 ">
            {data?.c?.posts?.length}
          </div>
          <div className="vs:max-sm:hidden justify-center sm:max-md:w-36 flex w-36">
            {data?.c?.members?.length}
          </div>

          <div className="flex text-center sm:hidden relative justify-around items-center">
            <BsThreeDotsVertical onClick={() => setOpen(!open)} />
            <div className={`${open ? "absolute top-5 z-50 -left-20 h-[120px] rounded-lg w-[100px] bg-white shadow-lg" : "hidden"} `}>
              <div className="flex flex-col justify-start items-start gap-3 p-3">
                <button>Edit</button>
                <button>Delete</button>
                <button>Analytics</button>
              </div>
            </div>
          </div>

          <div className="flex justify-around pn:max-sm:hidden items-center w-36 sm:max-md:w-28">
            <div className="flex text-center justify-center items-center">
              3%
            </div>
            <div className="flex text-center cursor-pointer relative justify-around items-center">
              <BsThreeDotsVertical onClick={() => setOpen(!open)} />
              <div className={`${open ? "absolute top-5 z-50 -left-20 h-[120px] rounded-lg w-[100px] bg-white shadow-lg" : "hidden"} `}>
                <div className="flex flex-col justify-start items-start gap-3 p-3">
                  <button onClick={() => {
                    Cookies.set("edta", encryptaes(JSON.stringify(data)))
                    // dispatch(communityforid(data?.c?._id))
                    Cookies.set("cmdyd", encryptaes(data?.c?._id))
                    Cookies.set("uisedr", encryptaes(data?.c?.creator?._id))
                    router.push("/main/community/editCommunity")

                  }}>Edit</button>
                  <button onClick={() => handleDelete({ dat: data, id: data?.c?._id, index: index })}>Delete</button>
                  <button>Analytics</button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between items-center sm:max-md:w-24 w-32">

           
            <div className="cursor-pointer" onClick={() => {
              {
                router.push("/main/community/editCommunity")
                dispatch(communityDataSend(data))
                // dispatch(communityforid(data?.c?._id))
                Cookies.set("cmdyd", encryptaes(data?.c?._id))
                Cookies.set("uisedr", encryptaes(data?.c?.creator?._id))
              }
            }} >


              <FiEdit3 />

            </div>
            <div className="cursor-pointer" title="Analytics">
              <TbBrandGoogleAnalytics onClick={() => setOpen(!open)} />
            </div>

         
            <div className="cursor-pointer" onClick={() => handleDelete({ dat: data, id: data?.c?._id, index: index })}>
              <RiDeleteBin6Line className="py-2 px-2 bg-red-500 rounded-2xl text-white w-8 h-8" />
            </div>
          </div> */}
        </div>
        <div
          className={`sm:grid-cols-4 sm:hidden grid-cols-2 px-5 pp:px-10 grid  gap-2 pt-4 
            `}
        >
          <div
            className={`
              
           py-5  flex items-center px-5 font-semibold ss:max-lg:min-w-40 w-full bg-[#FEF2E8]  rounded-2xl duration-150
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm pp:text-[16px]`}>
                Topics
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[29px]`}>{data?.c?.topics?.length}</div>
                {/* <div>+00.0%</div> */}
              </div>
            </div>
          </div>
          <div
            className={`

          py-5  ss:max-lg:min-w-40 w-full flex items-center px-5 font-semibold bg-[#F1F8EC] rounded-2xl duration-150
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm pp:text-[16px]`}>
                Total Posts
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[29px]`}>   {data?.c?.posts?.length}</div>
                {/* <div>+00.0%</div> */}
              </div>
            </div>
          </div>
          <div
            className={`
              
            py-5  ss:max-lg:min-w-40 w-full flex items-center  px-5 font-semibold bg-[#F2F0FE] rounded-2xl duration-150"
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm pp:text-[16px]`}>
                Members
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[29px]`}>   {data?.c?.members?.length}</div>
                {/* <div>+00.0%</div> */}
              </div>
            </div>
          </div>
          <div
            className={`
           
           py-5  ss:max-lg:min-w-40 w-full flex items-center  px-5 font-semibold bg-[#EAEEF6] rounded-2xl duration-150"
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm pp:text-[16px]`}>
                Engagement Rate
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[29px]`}>0</div>
                {/* <div>+00.0%</div> */}
              </div>
            </div>
          </div>
        </div>

      </div >

    </>
  );
}

export default Communitybox;
