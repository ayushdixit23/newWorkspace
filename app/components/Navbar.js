import React, { useEffect, useState } from "react";

import Link from "next/link";
import ComIcon from "../assets/icons/ComIcon";
import DashIcon from "../assets/icons/DashIcon";
import { usePathname } from "next/navigation";
// import ProIcon from "../assets/icons/Prosite";
import Store from "../assets/icons/Store";
// import PromIcon from "../assets/icons/Promotion";
import Logo from "../assets/Logo";
import { useSelector } from "react-redux";
import Edit from "../assets/icons/Edit";
import Earning from "../assets/icons/Earning";
import SettingIcon from "../assets/icons/SettingIcon";
// import SettingIcon from "../assets/icons/SettingIcon";

function NavBar() {
  const navItems = [
    {
      label: "Dashboard",
      path: "/main/dashboard",
      icon: <DashIcon className="sm:h-10 sm:w-10 h-8 w-8" />,
    },
    {
      label: "Community",
      path: "/main/community",
      icon: <ComIcon className="sm:h-7 sm:w-7 h-8 w-8" />,
    },
    {
      label: "Store",
      path: "/main/store",
      icon: <Store className="sm:h-7 sm:w-7 h-8 w-8" />,
    },
    // {
    //   label: "Customization ",
    //   path: "/main/customiz",
    //   icon: <Edit className="sm:h-7 sm:w-7 h-8 w-8" />,
    // },
    {
      label: "Earnings",
      path: "/main/earnings",
      icon: <Earning className="sm:h-7 sm:w-7 h-8 w-8" />,
    },

  ];
  const [pic, setPic] = useState();
  const [name, setName] = useState("");
  // const [prof, setProf] = useState(false);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

  // const se = useSearchParams();
  // const fetc = async () => {
  //   const p = sessionStorage.getItem("pic");
  //   const n = sessionStorage.getItem("fullname");
  //   const i = localStorage.getItem("id");
  //   setPic(p);
  //   setName(n);
  //   setId(i);
  // };

  // useEffect(() => {
  //   if (!mounted) {
  //     fetc();
  //     setMounted(true);
  //   }
  // }, []);

  const selector = useSelector((state) => state.userData.actualData)
  useEffect(() => {
    setName(selector?.fullname)
    setPic(selector?.dp)
  }, [selector])

  // const product = `/main/product`;
  return (
    <div>
      {/*sidebar*/}

      <div className="h-[100vh] bg-white p-1 vs:max-sm:hidden ">
        <div className="flex flex-col justify-between pt-10 h-[90vh]">
          <div className="flex items-center justify-center space-x-2 pl-4 pt-6 md:-ml-4">
            <Logo />
            <span className="text-[20px] font-bold vs:max-md:hidden  ">
              Workspace
            </span>
          </div>
          <nav>
            <ul className="flex flex-col justify-between">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 duration-150  ${path === item.path ? "" : "text-black"
                    }`}
                >
                  <div
                    className={` duraction-100 ${path === item.path
                      ? "h-10 w-1 rounded-full bg-black"
                      : "h-0 w-0"
                      }`}
                  ></div>
                  <div>
                    <Link href={item.path} className="flex items-center">
                      <div className="sm:max-md:my-4 sm:max-md:mx-2">
                        {item.icon}
                      </div>

                      <div
                        className={`p-4 vs:max-md:hidden  ${path === item.path ? "font-bold" : "font-medium"
                          }`}
                      >
                        {item.label}
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative left-3">
            <div className="flex gap-3 h-[60px] items-center">
              <SettingIcon className="w-2 h-2" />
              <Link
                href={"main/settings"}
                className="font-medium vs:max-md:hidden "
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*Tabbar*/}
      <div className="h-14 sm:hidden bottom-0  z-50 border-t-2 border-[#f5f5f5] bg-white fixed w-[100%] ">
        <nav className="z-20">
          <ul className="flex justify-between px-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={` flex-col flex justify-center items-center duration-150  ${path === item.path ? "" : "text-black"
                  }`}
              >
                <div
                  className={`duraction-100 ${path === item.path
                    ? "h-1 w-10 rounded-full bg-black"
                    : "h-0 w-0"
                    }`}
                ></div>
                <div className="h-10 w-10 pt-2">
                  <Link
                    href={item.path}
                    className="flex justify-center items-center"
                  >
                    <div>{item.icon}</div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
