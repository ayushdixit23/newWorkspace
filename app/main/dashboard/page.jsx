"use client";
import React, { useEffect, useState } from "react";
import p1 from "../../assets/image/Icon.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import emcom from "../../assets/image/emptycom.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import DontHave from "@/app/components/DontHave";
import Products from "@/app/components/Products";
import Customer from "@/app/components/Customer";
import Member from "@/app/components/Member";
import Demographics from "@/app/components/Demographics";
import LocationStore from "@/app/components/LocationStore";
import LocationCom from "@/app/components/LocationCom";
import Popularity from "@/app/data/Popularity";
import Loader from "@/app/data/Loader";
import Communitydata from "@/app/data/Communitydata";
import Storedata from "@/app/data/Storedata";
import { useGetAnalyticsQuery } from "@/app/redux/apiroutes/community";
import { useGetFetchOrderQuery } from "@/app/redux/apiroutes/userLoginAndSetting";

function Dashboard() {
  const [change, setChange] = useState("community");
  const [open, setOpen] = useState(false);
  const [comchange, setComchange] = useState("0");
  const [prochange, setProchange] = useState("1");
  const [loading, setLoading] = useState(true);
  const userdata = useSelector((state) => state.userData.actualData);
  const { data: analyticsdata, isLoading } = useGetAnalyticsQuery(
    { id: userdata?.id.toString() },
    { skip: !userdata?.id.toString() }
  );
  const { data: getorderdata } = useGetFetchOrderQuery(
    { id: userdata?.id.toString() },
    { skip: !userdata?.id.toString() }
  );
  const [state, setState] = useState({
    dp: "",
    name: "",
    popularity: "",
    stats: "",
    totalmembers: "",
    visitors: "",
    paidmember: "",
  });
  console.log(analyticsdata)

  useEffect(() => {
    if (
      analyticsdata?.commerged[0]?.image &&
      analyticsdata?.commerged[0]?.name &&
      analyticsdata?.commerged[0]?.popularity &&
      analyticsdata?.commerged[0]?.stats
    ) {
      setLoading(true);
      setState({
        dp: analyticsdata?.commerged[0]?.image,
        name: analyticsdata?.commerged[0]?.name,
        popularity: analyticsdata?.commerged[0]?.popularity,
        stats: analyticsdata?.commerged[0]?.stats,
        totalmembers: analyticsdata?.commerged[0].totalmembers,
        visitors: analyticsdata?.commerged[0].visitors,
        paidmember: analyticsdata?.commerged[0].paidmember,
      });
      setLoading(false);
    }
    setLoading(false);
  }, [analyticsdata]);

  if (isLoading || loading) {
    return <Loader />;
  }
  return (
    <div>
      {/* <Toaster /> */}
      <div className="grid grid-cols-1 py-3 w-full">
        <div className="grid sm:grid-cols-5 grid-cols-1 gap-3 bg-[#FAFAFA] h-[100vh]">
          <div className="col-span-3 px-3 flex flex-col w-full h-fit ">
            <div className="flex p-2 text-sm mb-1 items-center gap-3">
              <div
                onClick={() => setChange("community")}
                className="bg-[#F4F4F4] p-[6px] rounded-xl px-4"
              >
                Community
              </div>
              <div
                onClick={() => setChange("store")}
                className="bg-[#F4F4F4] p-[6px] rounded-xl px-4"
              >
                Store
              </div>
            </div>

            <div
              onClick={() => setOpen(false)}
              className={`${open ? "fixed inset-0 z-10" : "-z-40"}`}
            ></div>

            {analyticsdata?.commerged?.length == 0 ? (
              <div
                className={`w-full ${change == "community" ? null : "hidden"
                  } bg-white rounded-xl justify-center items-center flex flex-col h-full min-h-[500px]
                `}
              >
                <div className="flex flex-col gap-3 justify-center h-full items-center">
                  <div>
                    <Image src={emcom} />
                  </div>
                  <div className="text-[#1554F6] text-2xl font-medium">
                    Create Community
                  </div>
                  <div className="text-center">
                    Start connecting with new people and enjoy the Grovyo!
                  </div>
                  <div className="bg-[#1554F6] text-white p-2 px-6 rounded-xl">
                    Create Community
                  </div>
                </div>
              </div>
            ) : (
              <>
                {change == "community" && (
                  <Communitydata
                    state={state}
                    analyticsdata={analyticsdata}
                    setState={setState}
                    open={open}
                    setOpen={setOpen}
                  />
                )}
              </>
            )}
            {change == "store" && <Storedata getorderdata={getorderdata} />}
          </div>
          <div className="col-span-2 mt-2 w-full h-fit sm:rounded-xl sm:bg-white p-3 ">
            <div className={`${change == "community" ? null : "hidden"}`}>
              <Popularity state={state} />
              <div className="flex justify-evenly sm:justify-between bg-white py-2 rounded-xl my-2 px-3 flex-wrap items-center gap-2">
                <div
                  onClick={() => setComchange(1)}
                  className="bg-[#F9F9F9] p-2 px-4 rounded-xl"
                >
                  Members
                </div>
                <div
                  onClick={() => setComchange(2)}
                  className="bg-[#F9F9F9] p-2 px-4 rounded-xl"
                >
                  Demographics
                </div>
                <div
                  onClick={() => setComchange(3)}
                  className="bg-[#F9F9F9] p-2 px-4 rounded-xl"
                >
                  Location
                </div>
              </div>
              <div className="rounded-xl w-full p-3 bg-white">
                <div className={`${comchange == 0 ? null : "hidden"}`}>
                  <DontHave />
                </div>
                <div className={`${comchange == 1 ? null : "hidden"}`}>
                  <Member state={state} />
                </div>
              </div>
              <div className={`${comchange == 2 ? null : "hidden"}`}>
                <Demographics demo={analyticsdata?.demo} />
              </div>
              <div className={`${comchange == 3 ? null : "hidden"}`}>
                <LocationCom />
              </div>
            </div>
            <div className={`${change == "store" ? null : "hidden"}`}>
              <div className="grid grid-cols-2 w-full items-center gap-2">
                <div className="flex flex-col bg-white p-3 rounded-xl gap-2 border-2 w-full">
                  <div>
                    <Image src={p3} alt="p1" />
                  </div>
                  <div>
                    <div className="font-medium">Earings</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">0</div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-white p-3 rounded-xl gap-2 border-2 w-full">
                  <div>
                    <Image src={p1} alt="p2" />
                  </div>
                  <div>
                    <div className="font-medium">Customers</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.customers}
                      </div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
                <div className="flex col-span-2 bg-white flex-col p-3 rounded-xl gap-3 border-2 w-full">
                  <div>
                    <Image src={p2} alt="p2" />
                  </div>
                  <div className="flex justify-between items-center ">
                    <div>
                      <div className="font-medium">All Orders</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">
                          {getorderdata?.allorders}
                        </div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Pending</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">
                          {getorderdata?.pendingOrders?.length}
                        </div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Completed</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">
                          {getorderdata?.completedOrders?.length}
                        </div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between bg-white py-2 pn:max-sm:rounded-xl flex-wrap text-sm my-2 px-3 items-center gap-2">
                <div
                  onClick={() => setProchange(1)}
                  className="bg-[#F9F9F9] p-2 px-4 rounded-xl"
                >
                  Top Products
                </div>
                <div
                  onClick={() => setProchange(2)}
                  className="bg-[#F9F9F9] p-2 px-4 rounded-xl"
                >
                  Customer
                </div>
                <div
                  onClick={() => setProchange(3)}
                  className="bg-[#F9F9F9] p-2 px-4 rounded-xl"
                >
                  Demographics and Location
                </div>
              </div>
              <div className="sm:max-h-[400px] min-w-full overflow-scroll no-scrollbar bg-white rounded-xl">
                {prochange == 0 && <DontHave />}
                {prochange == 1 && <Products data={analyticsdata?.promerged} />}
                {prochange == 2 && <Customer />}
                {prochange == 3 && <LocationStore />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // else {
  //   return (
  //     <div>
  //       <Toaster />
  //       <div className="overflow-auto pt-1 scrollbar-hide   ">
  //         <div className="flex justify-between items-center">
  //           <div className="font-medium pl-4 text-[18px] py-2 px-10 bg-[#f2f2f2] animate-pulse  rounded-xl"></div>
  //         </div>
  //         <div className="w-[100%] md:px-10">
  //           <div className="h-[350px] w-[100%] vs:max-sm:flex-col bg-white sm:px-2 flex justify-between md:px-10 mt-4 rounded-2xl ">
  //             <div className="h-[100%] sm:w-[65%] rounded-3xl bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>
  //             <div className="h-[100%] vs:max-sm:hidden min-w-[200px] sm:w-[32%] rounded-3xl bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>
  //           </div>
  //           {/* phone */}
  //           <div className="h-[200px] w-[100%] sm:hidden mt-4 flex justify-between items-center">
  //             <div className="h-[100%] w-[49%]  bg-[#f2f2f2] animate-pulse rounded-2xl">
  //               <div className="h-[60%] w-full flex items-center justify-center text-[40px] font-semibold"></div>
  //             </div>
  //             <div className="h-[100%] w-[49%] bg-[#f2f2f2] animate-pulse rounded-2xl"></div>
  //           </div>
  //           <div className="h-[350px] w-[100%] sm:flex justify-between sm:px-2 md:px-10 mt-4 rounded-2xl ">
  //             <div className="h-[90%] sm:w-[32%] min-w-[200px] rounded-3xl bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>

  //             <div className="h-[90%] w-[32%] min-w-[200px] rounded-3xl vs:max-sm:hidden bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>

  //             <div className="h-[90%] w-[32%] min-w-[200px] rounded-3xl vs:max-sm:hidden bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Dashboard;
