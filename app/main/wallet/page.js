"use client";
import { API } from "@/Essentials";
import axios from "axios";
import Link from "next/link";
import React, { memo, useCallback, useEffect, useState } from "react";
import { IoIosCloudDone } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function page() {
  const [data, setData] = useState();
  const [money, setMoney] = useState();
  const [payhistory, setPayhistory] = useState();
  const [check, setCheck] = useState(false);

  const fetchdata = useCallback(async () => {
    const id = sessionStorage.getItem("id");

    try {
      const response = await axios.get(`${API}/fetchpayhistory/${id}`);

      if (response.data.success) {
        setMoney(response.data.money);
        const pay = response.data.payments;
        setPayhistory(pay);
        setCheck(true);
      } else {
        setCheck(false);
      }
    } catch (error) {
      console.log(error);
      setCheck(false);
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  if (check) {
    return (
      <div>
        <div className="overflow-auto pl-3 scrollbar-hide h-full sm:mx-5 ">
          <div className="font-bold pt-8 flex justify-between items-center text-[18px] sm:text-[25px]">
            <div className="">Wallet</div>
            <Link
              href="/main/wallet/addcoins"
              className="py-2 px-6 bg-blue-700 text-[14px] font-medium text-white rounded-2xl"
            >
              + Add Money
            </Link>
          </div>
          <div className="font-medium pt-8 text-[18px] ">
            <div className="">Total Balance: ₹{money}</div>
          </div>
          <div className="font-medium pt-8 text-[18px] ">
            <div className="">Balance history :</div>
          </div>
          {payhistory.map((p, i) => (
            <div
              key={i}
              className=" mx-4 bg-[#F1F1F1] mt-4 py-4 rounded-3xl flex justify-between px-4"
            >
              {p?.status === "completed" ? (
                <div className="flex items-center gap-4 bg-black py-2 px-6 rounded-2xl text-white">
                  <IoIosCloudDone size={20} className="text-blue-500" />
                  <div>
                    <div className="text-[14px]">Money Added</div>
                    <div className="text-[12px] flex items-center justify-center text-green-500">
                      {p?.status}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 bg-black py-2 px-6 rounded-2xl text-white">
                  <RxCross2 size={20} className="text-blue-500" />
                  <div>
                    <div className="text-[14px]">Money Not Added</div>
                    <div className="text-[12px] flex items-center justify-center text-green-500">
                      {p?.status}
                    </div>
                  </div>
                </div>
              )}

              <div className="vs:max-sm:hidden">{p?.paymentId}</div>
              <div className="text-[14px] flex flex-col items-center justify-center">
                <div className="text-[#9689fc] font-medium">₹{p?.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default memo(page);
