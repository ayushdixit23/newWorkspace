"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import c1 from "../../assets/image/c1.png";
import c2 from "../../assets/image/c2.png";
import c3 from "../../assets/image/c3.png";
import Fetch from "@/app/components/Fetch";
import { useGetFetchOrderQuery } from "@/app/redux/apiroutes/userLoginAndSetting";

const page = () => {
  const userdata = useSelector((state) => state.userData.actualData);
  const { data: getorderdata } = useGetFetchOrderQuery(
    { id: userdata?.id.toString() },
    { skip: !userdata?.id.toString() }
  );
  console.log(getorderdata);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastindex = currentPage * postPerPage;
  const firstIndex = lastindex - postPerPage;

  const postperData = getorderdata?.orders?.slice(firstIndex, lastindex);

  return (
    <>
      {/* <div className="flex flex-col justify-center  items-center gap-4">
        <div>
          {[getorderdata]?.map((o, i) => (
            <div key={i}>
              <div>all orders: {o?.allorders}</div>
              <div>completedOrders: {o?.completedOrders?.length}</div>
              <div>customers: {o?.customers}</div>
              <div>damaged orders: {o?.damaged?.length}</div>
              <div>pending orders: {o?.pendingOrders?.length}</div>
              <div>returned orders: {o?.returned?.length}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 justify-center items-center">
          {getorderdata?.orders?.map((d, j) => (
            <div key={j}>
              <div>customer name : {d?.buyerId?.fullname}</div>
              <div>Order Date : {d?.createdAt.slice(0, 10)}</div>
              <div>Payment Type : {d?.paymentMode}</div>
              <div>Status : {d?.currentStatus}</div>
              <div>
                routes: A : {d?.routes?.A}
                <div>!</div>
                <div>!</div>
                <div>!</div>
                B:{d?.routes?.B}
                <div>!</div>
                <div>!</div>
                <div>!</div>
                C:{d?.routes?.C}
                <div>!</div>
                <div>!</div>
                <div>!</div>
                D:{d?.routes?.D}
              </div>
              <div>Quantity : {d?.quantity}</div>
              <div>orderId: {d?.orderId}</div>
              <div>Total: {d?.total}</div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="grid grid-cols-1 w-full sm:p-3">
        <div className="text-[#8B8D97] my-2 text-lg">Track Order</div>
        <div className="grid grid-cols-1 w-full">
          <div className="flex flex-col">
            {/* web */}
            <div className="flex pn:max-sm:hidden justify-center bg-[#FAFAFA] p-3 w-full items-center gap-2 md:gap-5">
              <div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white rounded-xl gap-4 border-2 w-full">
                <div>
                  <Image src={c1} alt="p1" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Total Orders</div>
                  <div className="flex gap-1 text-xs  items-center">
                    <div className="text-base font-medium">
                      {getorderdata?.allorders}
                    </div>
                    <div className="text-green-700">+0.00%</div>
                  </div>
                </div>
              </div>
              <div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white rounded-xl gap-4 border-2 w-full">
                <div>
                  <Image src={c2} alt="p2" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Total Balance</div>
                  <div className="flex gap-1 text-xs  items-center">
                    <div className="text-base font-medium">0</div>
                    <div className="text-green-700">+0.00%</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-3 sm:max-md:text-xs py-5 bg-white rounded-xl gap-4 border-2 w-full">
                <div>
                  <Image src={c3} alt="p2" />
                </div>
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Cancelled</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.cancelled?.length}
                      </div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Returned</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.returned?.length}
                      </div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Damaged</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.damaged?.length}
                      </div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* mobile */}
            <div className="grid grid-cols-2 sm:hidden bg-[#FAFAFA] p-3 w-full items-center gap-2 md:gap-7">
              <div className="flex flex-col bg-white p-3 rounded-xl gap-2 border-2 w-full">
                <div>
                  <Image src={c1} alt="p1" />
                </div>
                <div>
                  <div className="font-medium">Total Orders</div>
                  <div className="flex gap-1 text-xs  items-center">
                    <div className="text-base font-medium">
                      {getorderdata?.allorders}
                    </div>
                    <div className="text-green-700">+0.00%</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white p-3 rounded-xl gap-2 border-2 w-full">
                <div>
                  <Image src={c2} alt="p2" />
                </div>
                <div>
                  <div className="font-medium">Total Balance</div>
                  <div className="flex gap-1 text-xs  items-center">
                    <div className="text-base font-medium">0</div>
                    <div className="text-green-700">+0.00%</div>
                  </div>
                </div>
              </div>
              <div className="flex col-span-2 bg-white flex-col p-3 rounded-xl gap-3 border-2 w-full">
                <div>
                  <Image src={c3} alt="p2" />
                </div>
                <div className="flex justify-between items-center ">
                  <div>
                    <div className="font-medium">Cancelled</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.cancelled?.length}
                      </div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Returned</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.returned?.length}
                      </div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Damaged</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.damaged?.length}
                      </div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Fetch data={postperData} />
            {/* <Pagination
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            length={data.length}
          /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;