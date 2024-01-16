"use client";
import React, { useEffect, useState } from "react";
import Communitybox from "./Communitybox";
import axios from "axios";
import { API } from "@/Essentials";
import Link from "next/link";
import Image from "next/image";
// import Authcheck from "@/Authcheck";
import Empty from "../../assets/image/emptyCommunity.png";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  useDeleteCommunityMutation,
  useGetCommunityQuery,
} from "@/app/redux/apiroutes/community";
import Loader from "@/app/data/Loader";

function page() {
  const [data, setData] = useState([]);
  const [success, setSucess] = useState();
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const userdata = useSelector((state) => state.userData.actualData);
  let id = userdata?.id.toString();
  const {
    data: comdata,
    isError,
    isSuccess,
    isLoading,
  } = useGetCommunityQuery(
    { id: userdata?.id.toString() },
    { skip: !userdata?.id.toString() }
  );
  const [deletecom] = useDeleteCommunityMutation();
  const handleDelete = async ({ dat, id, index }) => {
    try {
      const updatedData = data?.filter((d, i) => i !== index);
      setData(updatedData);
      // const response = await deletecom({
      //   comid: id
      // })
      // console.log(response.data)
    } catch (e) {
      console.log(e);
    }
    console.log("deleted");
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {/* <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
        <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] p-3 rounded-xl h-[250px] bg-white">
          <div className="flex flex-col flex-grow gap-3 justify-center items-center w-full">
            <div className="text-2xl font-semibold">Are You Sure?</div>
            <div className="text-center text-[#667085]">Do you really want to Delete this Community? This process cannot be undone.</div>
            <div className="flex justify-center w-full gap-3 items-center">
              <button className="w-full border-2 p-2 px-5 rounded-xl">Cancel</button>
              <button className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl">Delete</button>
            </div>
          </div>

        </div>
      </div> */}
      <div>
        <div className="pt-1">
          <div className="flex px-4 py-2 justify-between bg-white rounded-t-xl items-center">
            <div className=" text-[18px] font-medium text-[#8B8D97]  ">
              Community
            </div>
            <Link
              href="/main/community/createCommunity"
              className="py-2 vs:max-sm:hidden px-5 border-2 shadow-sm font-medium text-black rounded-xl"
            >
              Create community
            </Link>
          </div>
          <div className="sm:px-5 pt-3 bg-white">
            <div className="flex w-full bg-white py-5 rounded-2xl px-4 justify-between vs:max-sm:hidden mt-8">
              <div className="w-64 sm:max-md:w-52 font-semibold flex pl-10">
                Communities
              </div>
              {/* <div className="w-36 sm:max-md:w-24 flex font-semibold justify-center">
            </div> */}
              <div className="w-40 sm:max-md:w-24 flex font-semibold justify-center">
                Topics
              </div>
              <div className="w-36 sm:max-md:w-24 flex font-semibold justify-center">
                Total Posts
              </div>
              <div className="w-36 flex font-semibold justify-center">
                Members
              </div>
              <div className="w-36 flex font-semibold justify-center">
                <div className="relative -left-6">Engagement rate</div>
                <div className=" flex font-semibold justify-center"></div>
              </div>
            </div>

            <div className="my-6 pb-10">
              {comdata?.merged?.map((d, i, arr) => (
                <div
                  key={i}
                  className={`${i === 0 ? "rounded-t-xl" : ""} ${i === arr?.length - 1 ? "rounded-b-xl" : "border-b"
                    }`}
                >
                  <Communitybox
                    data={d}
                    index={i}
                    id={id}
                    handleDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/main/community/createCommunity"
            className="animate-bounce sm:hidden h-12 w-12  bg-blue-700 rounded-full flex justify-center items-center fixed right-5 sm:right-10 bottom-20 cursor-pointer"
          >
            <div className="text-white text-[30px] font-semibold">+</div>
          </Link>
        </div>
      </div>
    </>
  );
}
// return (
//   <div>
//     <div className="overflow-auto pt-2 scrollbar-hide flex flex-col items-center justify-center h-[80vh] sm:mx-5 ">
//       <Image src={Empty} className="h-96 w-96" alt="create community" />
//       <div className="font-semibold text-[18px] mt-6">
//         Create your community
//       </div>
//       <div>
//         The best way to get started is to quit talking and begin doing
//       </div>
//       <Link
//         href="/main/community/createCommunity"
//         className="py-2 px-6 bg-blue-600 text-white rounded-2xl mt-6"
//       >
//         Create community
//       </Link>
//     </div>
//   </div>
// );

// return (
//   <div>
//     <div className="overflow-auto pt-1 scrollbar-hide h-full ">
//       <div className="flex justify-between items-center">
//         <div className="sm:font-medium sm:pl-4 text-[18px] animate-pulse px-10 py-4 bg-[#f2f2f2] rounded-2xl text-[#8B8D97]"></div>
//         <Link
//           href="/main/store/addproduct"
//           className="vs:max-sm:hidden  animate-pulse px-10 py-4  bg-[#f2f2f2] text-white rounded-2xl"
//         ></Link>
//       </div>

//       <div className="pt-4">
//         <div className="flex w-full vs:max-sm:hidden sm:pt-4 px-4 justify-between">
//           <div className="w-64 sm:max-md:w-52 bg-[#f2f2f2]  animate-pulse font-medium flex justify-start "></div>
//           <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
//           <div className="w-36  sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
//           <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
//           <div className="w-36 sm:max-md:w-24 flex justify-center font-medium "></div>
//         </div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//         <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
//       </div>
//     </div>
//   </div>
// );

export default page;
