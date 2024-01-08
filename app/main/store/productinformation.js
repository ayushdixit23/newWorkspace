import React, { useEffect } from "react";
import { useState } from "react";
import Togglebutton from "../../components/togglebutton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import p1 from "../../assets/image/emptyCommunity.png"
import axios from "axios";
import { API } from "@/Essentials";
import { useDispatch } from "react-redux";
import { collection, product } from "@/app/redux/slice/userData";
import Image from "next/image";
import { formatISOStringToDMY } from "../../utils/Useful"

function productinformation({ handleDelete, data, userid, collectionid, index }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [change, setChange] = useState(true);
  const [mark, setMark] = useState(true);

  return (
    <div className="w-full">
      <div className=" flex items-center vs:max-sm:px-[2.6%]  sm:mx-2 sm:px-[1%] sm:rounded-[20px] py-3 justify-between">
        {/** */}
        <div className="flex gap-3 w-64 sm:max-md:w-52 items-center">
          <img

            src={data?.dp}
            alt="url"
            height={140}
            width={140}
            className="h-14 w-14 cursor-pointer flex justify-center items-center rounded-[10px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
          />

          {/**phone */}
          <div className="">
            <div className="font-semibold vs:max-sm:text-[16px]">
              {data?.name}
            </div>
            <div className="text-[12px] font-medium vs:max-sm:hidden">
              Sold by {data?.brandname}
            </div>
            <div className="sm:hidden flex">
              <strike className="text-gray-500 text-[13px] flex items-center">
                {data?.price}
              </strike>
              <div className="font-semibold text-[18px]">
                {data?.discountedprice}
              </div>
            </div>
          </div>
        </div>
        {/*web */}
        <>
          <div className="vs:max-sm:hidden sm:max-md:w-24  sm:max-md:justify-start w-36 flex justify-center ">
            <div className="space-y-4">
              <div className="vs:max-sm:hidden">{data?.quantity}</div>
            </div>
          </div>
          <div className="vs:max-sm:hidden w-36  flex justify-center ">
            <strike className="text-gray-500 text-[13px]">
              {data?.price}
            </strike>
            <div className="font-semibold text-[18px]">
              {data?.discountedprice}
            </div>
          </div>
          <div className="vs:max-sm:hidden sm:max-md:w-24  sm:max-md:justify-start w-36 flex justify-center ">
            <div className="space-y-4">
              <div className="vs:max-sm:hidden">{data?.quantity <= 0 ? "Out Of Stock" : "In Stock"}</div>
            </div>
          </div>

        </>

        {/* <div className=" justify-center items-center    sm:max-md:pr-10 space-x-1 w-36 mt-2 flex-col flex vs:max-sm:hidden">
          <div
            onClick={() => {
              setChange(!change);
            }}
          >
            <Togglebutton />
          </div>
          <div
            className={`${change === true
              ? "text-green-500 vs:max-sm:text-[12px] pt-1"
              : "hidden"
              }`}
          >
            In stock
          </div>
          <div
            className={`${change === false
              ? "text-red-500 vs:max-sm:text-[12px] pt-1"
              : "hidden"
              }`}
          >
            out of stock
          </div>
        </div> */}
        <div className="vs:max-sm:hidden sm:max-md:w-24  sm:max-md:justify-start w-36 flex justify-center ">
          <div className="space-y-4">
            <div className="vs:max-sm:hidden">{formatISOStringToDMY(data?.createdAt)}</div>
          </div>
        </div>

        <div
          onClick={() => {
            setMark(!mark);
          }}
          className="flex gap-2 items-center justify-end  md:w-36"
        >
          <div className="cursor-pointer" onClick={() => { router.push("/main/store/editproduct"); dispatch(collection(collectionid)); dispatch(product(data?._id)) }} title="Edit">
            <MdEdit size={20} />
          </div>
          <div title="Delete" onClick={() => handleDelete(userid, data?._id, collectionid, index)} className="cursor-pointer">
            <RiDeleteBin6Line size={20} />
          </div>
        </div>
      </div>

      {/* <div className="w-full px-5 flex justify-end">
        <div
          className={`${mark
            ? "hidden"
            : "flex flex-col items-center justify-center vs:max-sm:bg-[#f9f9f9] bg-white py-4 px-2 rounded-2xl absolute "
            }`}
        >
          <div>
            <Link href={href} title="Edit" className=" text-blue-600 ">
              Edit
            </Link>
          </div>

        </div>
      </div> */}
    </div>
  );
}

export default productinformation;
