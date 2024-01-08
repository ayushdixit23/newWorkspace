"use client";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  font1Reducer,
  font2Reducer,
  font3Reducer,
} from "../redux/slice/reduxSlice";

const Font = () => {
  const [kinare, setKinare] = useState(true);
  const [font, setFont] = useState([]);
  const dispatch = useDispatch();
  const selector3 = useSelector((state) => state.prosite);
  useEffect(() => {
    axios
      .get(`${API}/getFonts`)
      .then((res) => {
        setFont(res.data.data);
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
            kinare ? "left-0" : "-left-[600px]"
          }`}
        > */}
      <div className="sm:w-[400px] w-screen h-screen bg-[#252627] text-white p-3">
        <div className="grid grid-cols-1 my-3">
          <div>
            <div className="flex justify-center items-center bg-[#333333] rounded-xl">
              <input
                type="text"
                className="bg-transparent outline-none  rounded-xl w-full p-2 px-3"
                placeholder="Search"
              />
              <BsSearch className="text-xl mx-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 my-4 gap-2 w-full overflow-y-scroll no-scrollbar p-3 pb-20 max-h-[635px]">
            {font.map((d, i) => (
              <div
                key={i}
                onClick={() => {
                  const fontProperties = {
                    size: `${d?.fontSize}`,
                    family: `${d?.fontType}`,
                    shadow: `${d?.textShadow}`,
                    weight: `${d?.fontWeight}`,
                  };

                  dispatch(font1Reducer(fontProperties));
                  dispatch(font2Reducer(fontProperties));
                  dispatch(font3Reducer(fontProperties));
                }}
              >
                <div
                  style={{
                    fontFamily: `${d?.fontType}`,
                    fontSize: `${d?.fontSize}`,
                    fontWeight: `${d?.fontWeight}`,
                    textShadow: `${d?.textShadow}`,
                  }}
                  className="bg-[#333333] flex text-center justify-center items-center h-[150px] w-full rounded-xl"
                >
                  Select Your Font
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default Font;
