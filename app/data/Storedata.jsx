import Image from "next/image";
import React from "react";
import NoOrder from "../components/NoOrder";
import Img from "../assets/image/Img.png";
// import { BarPlot, ChartsXAxis, ResponsiveChartContainer } from "@mui/x-charts";
const Storedata = ({ getorderdata }) => {
  return (
    <div className={`flex flex-col gap-4`}>
      <div className="bg-white rounded-xl p-2 px-3">
        <div className="text-[#030229] font-medium pt-3 px-2">
          Store Analytics
        </div>
        <div className="flex items-center px-3 py-2 gap-4 w-full">
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="1" />
            <div>Last 6 days</div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="2" />
            <div>Last Week</div>
          </div>
        </div>
        <div className="w-full">
          {/* {analyticsdata?.find?.stats.map((l, e) => {
			if (l?.type == "store") {
			  return (
				<ResponsiveChartContainer
				  key={e}
				  series={[
					{
					  type: "bar",
					  data: l?.Y1,
					},
					{
					  type: "bar",
					  data: l?.Y2,
					},
				  ]}
				  xAxis={[
					{
					  data: l?.X,
					  scaleType: "band",
					  id: "x-axis-id",
					},
				  ]}
				  height={200}
				>
				  <BarPlot />

				  <ChartsXAxis
					label="X axis"
					position="bottom"
					axisId="x-axis-id"
				  />
				</ResponsiveChartContainer>
			  );
			}
		  })} */}
        </div>
      </div>

      {getorderdata?.orders.length == 0 ? (
        <div className="bg-white rounded-xl h-[370px] sm:h-[400px]">
          <NoOrder />
        </div>
      ) : (
        <div className="w-full rounded-xl bg-white sm:max-h-[400px] overflow-y-scroll overflow-hidden no-scrollbar min-h-[100px] ">
          <div className="text-xl font-semibold hidden sm:block p-2 sm:p-3 text-[#030229]">
            Recent Orders
          </div>
          <div className="pn:max-sm:hidden">
            <table className="w-full border-collapse  border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th colSpan="2" className="py-2 px-4 text-left">
                    Product Name
                  </th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Total Order</th>
                  <th className="py-2 px-4 text-left">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {getorderdata?.orders?.map((d, iw) => (
                  <tr key={iw}>
                    <td className="py-2 px-4 text-[#667085] text-sm">
                      #{d?.orderId?.slice(0, 8)}
                    </td>
                    <td colSpan="2" className="py-2 px-4 text-left">
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            src={getorderdata?.dp[iw]?.[0]}
                            alt="image"
                            className="max-w-[50px]"
                          />
                        </div>
                        <div className="flex flex-col text-sm">
                          {d?.productId?.map((e, y) => (
                            <div key={y}>{e?.name}</div>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="py-2 px-4 text-[#667085] text-sm">
                      &#8377; {d?.finalprice}
                    </td>
                    <td className="py-2 px-4 text-[#667085] text-sm font-medium">
                      {getorderdata?.allorders}
                    </td>
                    <td className="py-2 px-4 text-[#667085] text-sm">
                      &#8377; {d?.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden rounded-xl bg-white">
            <div>
              <div className="flex justify-between font-semibold p-3 items-center text-[#4A4C56]">
                <div>Recent Orders</div>
                <div>Status</div>
              </div>

              <div>
                {getorderdata?.orders?.map((d, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-2 px-4 items-center"
                  >
                    <div className="flex justify-center items-center gap-2 pp:gap-4">
                      {d?.productId?.map((f, ias) => (
                        <div key={ias}>
                          <Image
                            src={Img}
                            alt="image"
                            className="max-w-[60px]"
                          />
                        </div>
                      ))}
                      <div className="flex flex-col">
                        {d?.productId?.map((f, ia) => (
                          <div
                            key={ia}
                            className="font-semibold text-sm pp:text-base"
                          >
                            {f?.name}
                          </div>
                        ))}
                        <div className="text-[#667085] text-sm">
                          #{d?.orderId?.slice(0, 8)}
                        </div>
                        <div className="font-semibold text-sm pp:text-base">
                          Total: ₹{d?.total}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 text-sm pp:text-base bg-[#FDF1E8] text-[#E46A11] rounded-2xl">
                      {d?.currentStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Storedata;