import React from "react";
import Empty from "../assets/image/iconContainer.png";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";

const Products = ({ data }) => {
  return (
    <>
      <div className="min-w-[400px] min-h-[400px] overflow-scroll no-scrollbar">
        <div className="flex justify-between w-full p-2 items-center">
          <div className="text-lg font-semibold">Top Products</div>
          <div className="flex justify-center items-center gap-1 p-2 rounded-xl bg-[#FAFAFA]">
            <div>This Month</div>
            <div>
              <FaAngleDown />
            </div>
          </div>
        </div>
        <div className="my-1">
          <table className="w-full  rounded-xl border-collapse">
            <thead>
              <tr className="border-b">
                <th className=" text-center text-xs leading-4 py-2 px-3 text-[#ABABAB] font-medium uppercase tracking-wider">
                  No.
                </th>
                <th
                  colSpan="2"
                  className=" text-center text-xs leading-4 py-2 px-3 text-[#ABABAB] font-medium uppercase tracking-wider"
                >
                  Product
                </th>
                <th className=" text-center text-xs leading-4 py-2 px-3 text-[#ABABAB] font-medium uppercase tracking-wider ">
                  Price
                </th>
                <th className=" text-center text-xs leading-4 py-2 px-3 text-[#ABABAB] font-medium uppercase tracking-wider ">
                  Item Sold
                </th>
              </tr>
            </thead>
            <tbody className="gap-10">
              {data?.map((d, i) => (
                <tr key={i}>
                  <td className=" text-sm leading-5 py-2 px-3 text-center">
                    {i + 1}
                  </td>

                  <td
                    colSpan="2"
                    className="text-center text-sm py-2 px-3 leading-5 font-medium text-gray-900 col-span-3"
                  >
                    <div className="flex gap-2 items-center">
                      <div>
                        <img
                          src={d?.dps}
                          className="min-w-[35px] min-h-[35px] max-w-[45px] max-h-[45px]"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col items-start text-xs font-medium gap-1">
                        <div className="font-medium sm:text-sm">{d?.name}</div>
                        <div>{d?.brandname}</div>
                      </div>
                    </div>
                  </td>
                  <td className=" text-sm text-[#3276E8] font-medium leading-5 py-2 px-3 text-center">
                    ₹ {d?.price}
                  </td>
                  <td className=" text-sm leading-5 py-2 px-3 text-center">
                    {d?.itemsold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
