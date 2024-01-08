import React from "react";

const NoPost = () => {
  return (
    <>
      <div className="bg-white rounded-xl my-4 h-[300px]">
        <div className="sm:p-5 p-3 flex justify-center gap-3 h-full items-center flex-col">
          <div className="text-2xl text-[#1554F6] font-semibold">
            No posts yet
          </div>
          <div className="pn:max-sm:text-center">
            Sharing about a life update is not a bad idea.
          </div>
          <div className="bg-[#1554F6] text-white p-2 px-4 rounded-lg text-sm">
            + Start Post
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPost;
