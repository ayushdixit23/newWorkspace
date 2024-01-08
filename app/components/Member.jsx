import React from "react";

const Member = ({ state }) => {
  const { totalmembers, visitors, paidmember } = state
  return (
    <>
      <div className="p-2 text-[#323743] flex flex-col gap-6 font-medium">
        <div className="flex justify-between items-center p-1 w-full">
          <div>Total Members</div>
          <div>{totalmembers}</div>
        </div>
        {/* <div className="flex justify-between items-center p-1 w-full">
          <div>Active Members</div>
          <div>0</div>
        </div>
        <div className="flex justify-between items-center p-1 w-full">
          <div>Unique Members</div>
          <div>0</div>
        </div> */}
        <div className="flex justify-between items-center p-1 w-full">
          <div>Paid Members</div>
          <div>{visitors}</div>
        </div>
        <div className="flex justify-between items-center p-1 w-full">
          <div>Visitors</div>
          <div>{paidmember}</div>
        </div>
      </div>
    </>
  );
};

export default Member;
