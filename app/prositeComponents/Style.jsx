"use client";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { backColor } from "../redux/slice/reduxSlice";
import { useDispatch } from "react-redux";

const Style = () => {
  const [use, setUse] = useState(2);
  const [slide, setSlide] = useState(true);
  const [bg, setBg] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API}/getbackColor`)
      .then((res) => {
        setBg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {/* <div className="relative">
        <div
          className={`absolute w-full duration-700 top-0 ${
            slide ? "left-0" : "-left-[600px]"
          }`}
        > */}
      <div className="sm:w-[400px] w-screen h-screen bg-[#252627] text-white p-3">
        <div className="grid grid-cols-1 my-3">
          <div className="flex justify-center gap-1 rounded-xl bg-[#38393D] items-center p-2">
            <div
              onClick={() => setUse(1)}
              className={`w-[50%] text-center p-2 rounded-xl ${
                use === 1 ? "bg-[#636366]" : null
              }`}
            >
              Templates
            </div>
            <div
              onClick={() => setUse(2)}
              className={`w-[50%] text-center p-2 rounded-xl ${
                use === 2 ? "bg-[#636366]" : null
              }`}
            >
              Styles
            </div>
          </div>

          <div
            className={`grid grid-cols-1 w-full ${use == 1 ? null : "hidden"}`}
          >
            <div className="my-7">
              <div className="flex justify-center items-center bg-[#333333] rounded-xl">
                <input
                  type="text"
                  className="bg-transparent outline-none  rounded-xl w-full p-2 px-3"
                  placeholder="Search"
                />
                <BsSearch className="text-xl mx-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full my-4 overflow-y-scroll no-scrollbar max-h-[520px]">
              <div>
                <div className="flex mb-2 justify-between items-center">
                  <div>Upload</div>
                  <div className="underline">more</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-full bg-white rounded-xl h-[150px]"></div>
                  <div className="w-full bg-white rounded-xl h-[150px]"></div>
                </div>
              </div>

              <div className="my-5">
                <div className="flex mb-2 justify-between items-center">
                  <div>Trending</div>
                  <div className="underline">more</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-full bg-white rounded-xl h-[150px]"></div>
                  <div className="w-full bg-white rounded-xl h-[150px]"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 w-full ${use == 2 ? null : "hidden"}`}
          >
            <div className="my-7">
              <div className="flex justify-center items-center bg-[#333333] rounded-xl">
                <input
                  type="text"
                  className="bg-transparent outline-none  rounded-xl w-full p-2 px-3"
                  placeholder="Search"
                />
                <BsSearch className="text-xl mx-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 my-4 overflow-y-scroll no-scrollbar max-h-[520px]">
              <div>
                <div className="flex mb-2 justify-between items-center">
                  <div>Upload</div>
                  <div className="underline">more</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {bg.map((d, i) => (
                    <div key={i}>
                      <div
                        onClick={() =>
                          dispatch(
                            backColor({
                              bgcolor: d?.backgroundColor,
                              textcolor: d?.textcolor,
                              buttonColor: d?.buttonColor,
                            })
                          )
                        }
                        className="w-full flex bg-white rounded-xl h-[150px]"
                      >
                        <div
                          className="h-full w-full"
                          style={{
                            backgroundColor: `${d?.backgroundColor}`,
                          }}
                        ></div>
                        <div
                          className="h-full  w-full"
                          style={{
                            backgroundColor: `${d?.textcolor}`,
                          }}
                        ></div>
                        <div
                          className="h-full  w-full"
                          style={{
                            backgroundColor: `${d?.buttonColor}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-5">
                <div className="flex mb-2 justify-between items-center">
                  <div>Trending</div>
                  <div className="underline">more</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-full bg-white flex flex-col gap-1 p-2 rounded-xl h-[150px]">
                    <div className="w-full h-full rounded-xl"></div>
                    <div className="text-black text-sm font-semibold">
                      Font Name
                    </div>
                  </div>
                  {/* <div className="w-full bg-white flex flex-col gap-1 p-2 rounded-xl h-[150px]">
                        <div className="w-full bg-blue-900 h-full rounded-xl"></div>
                        <div className="text-black text-sm font-semibold">
                          Font Name
                        </div>
                      </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default Style;
