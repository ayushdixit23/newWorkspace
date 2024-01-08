"use client";
import { useEffect, useState } from "react";
import MobileNav from "../prositeComponents/MobileNav";
import Sidebar from "../prositeComponents/Sidebar";

import Text from "../prositeComponents/Text";
import Common from "../prositeComponents/Common";
import Style from "../prositeComponents/Style";
import Font from "../prositeComponents/Font";
import logo from "../assets/Logo";
import Image from "next/image";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "@/Essentials";
import { templateData } from "../redux/slice/dataSlice";

export default function MainLayout({ children }) {
  const [values, setValues] = useState(0);
  const [name, setName] = useState();
  const [pic, setPic] = useState();
  const [username, setUsername] = useState();
  const userdata = useSelector((state) => state.userData.actualData);
  const alldata = useSelector((state) => state.prosite);
  const buttonSelector = useSelector((state) => state.data?.buttonDetails);
  const backColor = useSelector((state) => state.prosite?.backcolor);
  const textcolor = useSelector((state) => state.prosite?.textcolor);
  const bc = useSelector((state) => state.prosite?.button.bg);
  const [change, setChange] = useState({
    c1: "Design driven development of your web product",
    c2: "We are a full service digital agency that builds immesive user experience.",
  });

  const dispatch = useDispatch();
  const fun = async (alldata, backColor, textcolor, buttonSelector) => {
    const jsxString = `
    <div style="
    background-image: url(${alldata?.background});
    background-color: ${backColor};
    background-size: cover;
    color: ${textcolor};
    background-position: center;
    display: grid; grid-template-columns: 1fr; width: 100%; height: 100vh; padding: 12px;">
    <div style="display: grid; grid-template-columns: 1fr; width: 100%;">
      <div style="display: flex; justify-content: center; align-items: center;">
      <div style="border:5px solid black;" class="flex pn:max-sm:flex-col w-full">
          <div style="display: flex; justify-content: center; align-items: center; padding: 12px;">
            <div style="display: flex; flex-direction: column; padding: 2px; gap: 1rem;">
              <div style="
              font-family: ${alldata?.font1?.family};
              text-shadow: ${alldata?.font1?.shadow};
              font-weight: ${alldata?.font1?.weight};
              ">
                Design driven development of your web product
              </div>
              <div style="
              font-family: ${alldata?.font2?.family};
              text-shadow: ${alldata?.font2?.shadow};
              font-weight: ${alldata?.font2?.weight};
              ">
                We are a full service digital agency that builds immersive
                user experience.
              </div>
              <div>
              <a href=${buttonSelector.link} target="_blank">
              <button style="
              background: ${alldata?.button?.bg || bc};
              color: ${alldata?.button?.color};
              padding: ${alldata?.button?.pad};
              box-shadow: ${alldata?.button?.boxShadow};
              border-radius: ${alldata?.button?.borderRadius};
              font-weight: ${alldata?.button?.weight};
              border-bottom: ${alldata?.button?.borderBottom};
              ">
              ${buttonSelector.text ? buttonSelector.text : "Learn More!"}
              </button>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: center; align-items: center;">
              <img src=${alldata?.image}  alt="image" style="
              max-width: 90%;
              max-height:"300px"
              object-fit: cover;
              width: 100%;
              @media (min-width: 450px) {
                max-width: 70%;
              }
              @media (min-width: 720px) {
                max-width: 400px;
              }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  `;

    try {
      const res = await axios.post(`${API}/postforprosite`, {
        data: jsxString,
        id: userdata?.id.toString(),
      });
      console.log(res.data);
      if (res.data.success) {
        await fetchData();
      }
    } catch (e) {
      console.error("Plz error mt dena", e);
    }
  };

  const fetchData = async () => {
    axios
      .post(`${API}/getprositefull`, { username: `@${userdata?.username}` })
      .then((res) => {
        dispatch(templateData([res.data.prosite]));
      })
      .catch((E) => console.log(E));
  };

  useEffect(() => {
    if (userdata) {
      fetchData();
    }
  }, [userdata?.username]);

  useEffect(() => {
    setName(userdata?.fullname);
    setPic(userdata?.dp);
    setUsername(userdata?.username);
  }, [userdata]);
  return (
    <div className="flex flex-col h-screen w-screen fixed left-0 top-0">
      <div className="h-[100%]">
        {/* header */}
        <div
          onClick={() => setValues(0)}
          className="flex justify-between w-full shadow p-[6px] px-[2%] items-center h-[10%]"
        >
          <div className="flex justify-center gap-2 items-center">
            <div>
              <img
                src={`${pic}`}
                alt="image"
                className="max-h-[45px] rounded-full max-w-[45px]"
              />
            </div>
            <div className="flex flex-col text-sm">
              <div className="font-medium">{name}</div>
              <div>{username}</div>
            </div>
          </div>
          <div
            onClick={() => fun(alldata, backColor, textcolor, buttonSelector)}
            className="flex justify-center bg-[#F6F6F6] rounded-full p-2 px-5 items-center gap-1"
          >
            <div>
              <AiOutlineSave />
            </div>
            <div className="text-sm">Save Changes</div>
          </div>
        </div>
        {/* main */}
        <div className="flex h-[90%]">
          <div className="flex">
            <div className="z-20">
              <div className="pn:max-md:hidden">
                <Sidebar setValues={setValues} />
              </div>
              <div className="md:hidden z-50">
                <MobileNav setValues={setValues} />
              </div>
            </div>

            <div className={`${values == 1 ? "z-30" : "hidden"}`}>
              <Common values={values} />
            </div>
            <div className={`${values == 2 ? "z-30" : "hidden"}`}>
              <Text />
            </div>
            <div className={`${values == 3 ? "z-30" : "hidden"}`}>
              <Style />
            </div>
            <div className={`${values == 4 ? "z-30" : "hidden"}`}>
              <Font />
            </div>
          </div>
          <div className="z-20 w-screen no-scrollbar overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
