"use client";
// import Togglebutton from "../../../components/togglebutton";
// import { useEffect } from "react";
// import axios from "axios";
// import { API } from "@/Essentials";
// import { useState } from "react";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { decryptaes } from "@/app/utils/security";
import { useGetPostQuery } from "@/app/redux/apiroutes/community";

function access() {
  let post = [];
  // const userdata = useSelector((state) => state.userData.actualData)
  // const communityid = useSelector((state) => state.userData.communityid)
  const id = decryptaes(Cookies.get("uisedr"));
  const comid = decryptaes(Cookies.get("cmdyd"));
  const { data, isError, isLoading } = useGetPostQuery(
    { id: id, comid: comid },
    { skip: !id && !comid }
  );
  console.log(data?.postdetails);

  const clearCookies = () => {
    Cookies.remove("cmdyd");
    Cookies.remove("uisedr");
  };

  useEffect(() => {
    const handlePopstate = () => {
      clearCookies();
      window.location.href = "/main/community";
    };
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = handlePopstate;
    return () => {
      window.onpopstate = null;
    };
  }, []);

  console.log(id, comid);
  return (
    // <div className="pt-5 space-y-5 sm:px-[30%] px-1 bg-white py-3 mt-4">
    //   <div className="flex justify-between items-center">
    //     <div>Block screenshot</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Block screen recording</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Block message forwarding</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Block message deletion</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Hide members</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    // </div>
    <>
      <div>
        {data?.postdetails?.map((d, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-full gap-4 justify-center"
          >
            <div>post name {d?.post?.title}</div>
            <div>Community name {d?.community}</div>
            <div className="flex justify-center items-center gap-5">
              <div>Likes {d?.post?.likes}</div>
              <div>Dislike {d?.post?.dislike}</div>
              <div>Share {d?.post?.sharescount}</div>
              <div>Views {d?.post?.views}</div>
              <div>comments {d?.post?.comments?.length}</div>
              <div>Engagement {d?.engagementrate}</div>
              <div>created at {d?.post?.createdAt}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default access;
