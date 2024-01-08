import Image from "next/image";
import React from "react";
import { MdOutlineNotifications } from "react-icons/md";
import e1 from "../../assets/image/e1.png";
import e2 from "../../assets/image/e2.png";
import Cl from "../../assets/image/Cl.png";
import vector from "../../assets/image/vector.png";
import ads from "../../assets/image/ads.png";
import order from "../../assets/image/order.png";
import rupee from "../../assets/image/rupee.png";
import { MdAdd } from "react-icons/md";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 w-full">
        <div className="flex justify-between py-2 my-3 px-5 bg-white rounded-2xl items-center">
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-[#0066FF] sm:leading-snug sm:max-w-[80%] px-3 font-semibold text-xl sm:text-[26px]">
              "Empower Your Community: Unlock Ads and Stores for Earning
              Potential!"
            </div>
            <div className="flex items-center px-3 pb-3">
              <div className="bg-black rounded-full gap-2 font-medium text-white p-2 px-3 flex justify-center items-center">
                <div>Notify Me!</div>
                <div className="text-xl bg-white text-black rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7">
                  <MdOutlineNotifications />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:block hidden">
            <Image
              src={e1}
              alt="image"
              className="md:max-w-[500px] max-w-[300px] max-h-[180px]"
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-1">
          <div className="grid w-full  p-2 sm:p-3 sm:px-5 gap-4 grid-cols-1">
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex bg-white items-center p-3 sm:px-5 rounded-xl gap-3 w-full">
                <div>
                  <Image
                    src={rupee}
                    className="min-w-[20px] min-h-[20px]"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">Total Earnings</div>
                  <div className="font-semibold">₹0.00</div>
                </div>
              </div>
              <div className="flex bg-white items-center p-3 sm:px-5 rounded-xl gap-3 w-full">
                <div>
                  <Image
                    src={e2}
                    className="min-w-[20px] min-h-[20px]"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm ">Pending Payments</div>
                  <div className="font-semibold">₹0.00</div>
                </div>
              </div>
              <div className="flex pn:max-sm:col-span-2 bg-white justify-between items-center p-4 sm:p-3 px-5 rounded-xl gap-3 w-full">
                <div className="flex justify-center gap-4 items-center">
                  <div>
                    <Image
                      src={vector}
                      className="min-w-[20px] min-h-[20px]"
                      alt="image"
                    />
                  </div>
                  <div className="sm:text-sm font-semibold">Add Bank</div>
                </div>
                <div className="w-4 h-4 rounded-full border flex justify-center items-center border-black">
                  <MdAdd />
                </div>
              </div>
            </div>
            <div className="w-full sm:bg-white rounded-xl p-3">
              <div className="text-[#666666] pn:max-sm:text-center font-medium">
                You haven't met the criteria to apply for monetisation tool
                access.
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-3 justify-center items-center">
                <div className="flex flex-col gap-3 bg-white shadow-lg py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Image src={order} className="max-w-[80px]" alt="image" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xl font-semibold">Store</div>
                      <div className="text-sm text-[#444444]">
                        "Make shopping fun! Help your viewers find and buy cool
                        stuff while they watch your videos. Connect your store
                        to share products with your friends."
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm flex-col gap-3">
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" text-[#615E83]">Members</div>
                        <div>10</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "70%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" text-[#615E83]">Engagament Rate</div>
                        <div className="">10 %</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "40%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 bg-white shadow-lg py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Image src={Cl} className="max-w-[80px]" alt="image" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xl font-semibold">Paid Topics</div>
                      <div className="text-sm text-[#444444]">
                        "Create a paid topic and earn monthly income from your
                        members. Your followers pay for exclusive access, and
                        you generate extra revenue."
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm flex-col gap-3">
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" text-[#615E83]">Members</div>
                        <div>100</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "45%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" text-[#615E83]">Engagament Rate</div>
                        <div className="">10 %</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "70%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 bg-white shadow-lg py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Image src={ads} className="max-w-[80px]" alt="image" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xl font-semibold">Ads</div>
                      <div className="text-sm text-[#444444]">
                        "Make money with ads on your community posts! Earn from
                        ads that appear before, during, and after your videos on
                        the watch page."
                      </div>
                    </div>
                  </div>
                  <div className="flex text-sm flex-col gap-3">
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" text-[#615E83]">Members</div>
                        <div>1000</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "60%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                    <div className="px-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className=" text-[#615E83]">Engagament Rate</div>
                        <div className="">10 %</div>
                      </div>
                      <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                        <div
                          style={{ width: "50%" }}
                          className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
