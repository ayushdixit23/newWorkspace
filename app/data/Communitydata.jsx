import Image from "next/image";
import React from "react";
import Empty from "../assets/image/iconContainer.png";
import { FaAngleDown } from "react-icons/fa";
import { BarPlot, ChartsXAxis, ResponsiveChartContainer } from "@mui/x-charts";
import Postdata from "./Postdata";
import { formatISOStringToDMY } from "../utils/Useful";

const Communitydata = ({ state, analyticsdata, setState, open, setOpen }) => {

  const communityData = state.stats && state?.stats?.map((d) => ({
    Y1: Number(d.Y1),
    X: formatISOStringToDMY(d.X),
    Y2: Number(d.Y2)

  }))
  return (
    <div>
      <div className="rounded-xl bg-white">
        <div className="flex justify-between p-2">
          <div className="flex justify-bewteen sm:min-w-[150px] sm:justify-center pn:max-sm:order-2 p-[6px] rounded-2xl px-2 bg-[#FAFAFA] relative items-center gap-2">
            <div className="flex justify-center gap-1 items-center ">
              <div>
                {state.dp ? (
                  <img
                    src={state.dp}
                    className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                    alt="image"
                  />
                ) : (
                  <Image
                    src={Empty}
                    className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                    alt="image"
                  />
                )}
              </div>
              <div className="text-xs pn:max-sm:hidden">
                {state.name ? state.name : "Community"}
              </div>
            </div>
            <div onClick={() => setOpen(!open)} className="text-lg">
              <FaAngleDown />
            </div>
            <div
              className={`${open
                ? "absolute pn:max-sm:min-w-[200px] text-black pn:max-sm:-left-32 max-h-[250px] z-20 rounded-xl shadow-lg bg-white top-12 w-full overflow-y-scroll no-scrollbar"
                : "hidden"
                }`}
            >
              <div className="w-full">
                {analyticsdata?.commerged?.map((d, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setState({
                        dp: d?.image,
                        name: d?.name,
                        popularity: d?.popularity,
                        stats: d?.stats,
                        totalmembers: d?.totalmembers,
                        visitors: d?.visitors,
                        paidmember: d?.paidmember,
                      });
                      setOpen(false);
                    }}
                    className="flex justify-start p-2 gap-2 w-full items-center "
                  >
                    <div>
                      <img
                        src={d?.image}
                        className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                        alt="image"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs">{d?.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex order-1 sm:hidden justify-center items-center gap-1">
            {state.name ? state.name : "Community"}
          </div>
          {/* <div className="flex pn:max-sm:hidden justify-center items-center gap-1">
            <div className="text-xl">
              <BiUpArrowAlt />
            </div>
            <div className="text-sm">2.1% vs last week</div>
          </div> */}
        </div>

        {/* <div className="flex items-center px-3 py-2 gap-4 w-full">
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="1" />
            <div>Last 6 days</div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="2" />
            <div>Last Week</div>
          </div>
        </div> */}

        <div className="w-full h-full">


          {communityData && communityData?.length > 0 &&
            <ResponsiveChartContainer
              dataset={communityData}
              series={[
                {
                  type: "bar",
                  dataKey: "Y1",
                },
                {
                  type: "bar",
                  dataKey: "Y2",
                },
              ]}
              xAxis={[
                {
                  dataKey: "X",
                  scaleType: "band",
                  id: "x-axis-id",
                  categoryGapRatio: 0.4,
                },
              ]}
              height={200}
              className="z-10 w-full"
            >
              <BarPlot layout="horizontal" />
              <ChartsXAxis
                label="X axis"
                position="bottom"
                axisId="x-axis-id"
              />
            </ResponsiveChartContainer>
          }
        </div>
      </div>

      <div className="flex flex-col my-3 gap-2 pn:max-sm:hidden bg-white p-2 px-4 rounded-xl">
        <div>Topics</div>
        <div className="flex w-full items-center gap-4">
          {analyticsdata?.commerged
            ?.filter((c) => c?.name == state.name)
            .map((w, index) =>
              w?.topic.map((d, i) => (
                <div key={i} className="bg-[#fafafa] p-1 px-4 rounded-xl">
                  {d?.title}
                </div>
              ))
            )}
          {/* <div className="bg-[#fafafa] p-1 px-4 rounded-xl">Post</div> */}
        </div>
      </div>
      <Postdata analyticsdata={analyticsdata} state={state} />
    </div >
  );
};

export default Communitydata;
