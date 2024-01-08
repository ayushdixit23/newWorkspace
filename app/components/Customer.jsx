import { PieChart } from "@mui/x-charts";
import React from "react";
import { FaAngleDown } from "react-icons/fa";

const Customer = () => {
  return (
    <>
      <div className="lg:min-w-[400px] overflow-scroll no-scrollbar">
        <div className="flex justify-between w-full p-2 items-center">
          <div className="text-lg font-semibold">Customers</div>
          <div className="flex justify-center items-center gap-1 p-2 rounded-xl bg-[#FAFAFA]">
            <div>Weekly</div>
            <div>
              <FaAngleDown />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center relative left-7">
          <PieChart
            colors={["#C4C4C4", "#5A6ACF", "#8593ED"]}
            series={[
              {
                data: [
                  { id: 0, value: 10, color: "#5A6ACF" },
                  { id: 1, value: 15, color: "#8593ED" },
                  { id: 2, value: 20, color: "#C4C4C4" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </>
  );
};

export default Customer;
