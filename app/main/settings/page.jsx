"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaUnlockAlt } from "react-icons/fa";
import s1 from "../../assets/image/svg.png";
import s2 from "../../assets/image/svg1.png";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loader from "@/app/data/Loader";
import {
  useGetProfileQuery,
  usePostProfileMutation,
  usePostProfileStoreMutation,
} from "@/app/redux/apiroutes/userLoginAndSetting";

const page = () => {
  const userdata = useSelector((state) => state.userData.actualData);
  const [id, setId] = useState();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit2, setEdit2] = useState(false);
  const { data, isLoading, refetch } = useGetProfileQuery(
    { id: id ? id : userdata?.id.toString() },
    { skip: !userdata?.id.toString() || !id }
  );
  const [settings, setSettings] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    storeAddress: "",
    city: "",
    landmark: "",
    state: "",
    postalCode: "",
  });
  const [profileDetails] = usePostProfileMutation();
  const [profileStoreDetails] = usePostProfileStoreMutation();
  useEffect(() => {
    setId(userdata?.id.toString());
  }, [userdata]);

  const sendDetails = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: settings.name,
        phone: settings.phone,
        email: settings.email,
        username: settings.username,
      };
      const response = await profileDetails({
        id: id,
        data: data,
      });
      console.log(response.data);
      if (response.data?.success) {
        await resetCookies(response.data);
        await refetch();
        setEdit(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const sendDetails2 = async (e) => {
    e.preventDefault();
    try {
      const data = {
        storeAddress: settings.storeAddress,
        city: settings.city,
        landmark: settings.landmark,
        state: settings.state,
        postalCode: settings.postalCode,
      };
      const response = await profileStoreDetails({
        id: id,
        data: data,
      });
      console.log(response.data);
      if (response.data?.success) {
        await resetCookies(response.data);
        await refetch();
        setEdit2(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resetCookies = async (data) => {
    try {
      Cookies.remove("work_grip");
      Cookies.set("work_grip", data?.endata);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(settings);
  console.log(id);

  useEffect(() => {
    setLoading(true);
    setSettings({
      name: `${data?.data?.name}`,
      phone: `${data?.data?.phone}`,
      email: `${data?.data?.email}`,
      username: `${data?.data?.username}`,
      storeAddress: `${data?.data?.storeAddress}`,
      city: `${data?.data?.city}`,
      landmark: `${data?.data?.landmark}`,
      state: `${data?.data?.state}`,
      postalCode: `${data?.data?.postalCode}`,
    });
    setLoading(false);
  }, [data]);

  console.log(loading);

  if (isLoading || loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-1 w-[95%] p-3">
            <div className="flex justify-start items-center">
              <div className="flex items-center gap-2">
                <div className="flex justify-center gap-2 items-center p-3 px-7 rounded-lg text-white bg-[#467AFF]">
                  <div>
                    <CgProfile />
                  </div>
                  <div>Profile Info</div>
                </div>
                <div className="flex justify-center gap-2 items-center p-3 px-7 rounded-lg ">
                  <div>
                    <FaBell />
                  </div>
                  <div>Notifications</div>
                </div>
                <div className="flex justify-center gap-2 items-center p-3 px-7 rounded-lg ">
                  <div>
                    <FaUnlockAlt />
                  </div>
                  <div>Security</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 my-3 gap-7 md:gap-16 w-full">
              <div className="flex flex-col gap-2 col-span-5 sm:col-span-3">
                <div className="bg-white p-3 flex justify-center rounded-lg items-center flex-col">
                  <div className="flex justify-between pb-2 w-full items-center">
                    <div className="text-xl font-semibold">
                      General Information
                    </div>
                    <div className="flex justify-center gap-2 items-center">
                      <div
                        onClick={() => setEdit(true)}
                        className="border-b border-black"
                      >
                        Edit
                      </div>
                      {edit && (
                        <div
                          onClick={sendDetails}
                          className="text-white rounded-3xl bg-[#0069FF] p-1 px-3"
                        >
                          Save Changes
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full flex-col gap-2">
                    <div className="flex justify-center w-full flex-col">
                      <div className="font-semibold pb-1">Name</div>
                      <div className="w-full">
                        {edit ? (
                          <input
                            value={settings.name}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                name: e.target.value,
                              })
                            }
                            type="text"
                            className="bg-[#F1F1F1] border-2 w-full outline-none focus:border-blue-500 rounded-xl p-2"
                            placeholder="Enter FullName"
                          />
                        ) : (
                          <div className="w-full py-1">{settings.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 w-full">
                      <div className="flex justify-center w-full flex-col">
                        <div className="font-semibold pb-1">Phone number</div>
                        <div className="w-full">
                          {edit ? (
                            <input
                              type="tel"
                              value={settings.phone}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  phone: e.target.value,
                                })
                              }
                              className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                              placeholder="Enter FullName"
                            />
                          ) : (
                            <div className="w-full py-1">{settings.phone}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center w-full flex-col">
                        <div className="font-semibold pb-1">Email</div>
                        <div className="w-full">
                          {edit ? (
                            <input
                              type="email"
                              value={settings.email}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  email: e.target.value,
                                })
                              }
                              className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                              placeholder="Enter FullName"
                            />
                          ) : (
                            <div className="w-full py-1">{settings.email}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-full flex-col">
                      <div className="font-semibold pb-1">Username</div>
                      <div className="w-full">
                        {edit ? (
                          <input
                            value={settings.username}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                username: e.target.value,
                              })
                            }
                            type="text"
                            className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                            placeholder="Enter FullName"
                          />
                        ) : (
                          <div className="w-full py-1">{settings.username}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 flex justify-center rounded-lg items-center flex-col">
                  <div className="flex justify-between pb-2 w-full items-center">
                    <div className="text-xl font-semibold">
                      Store Information
                    </div>
                    <div className="flex justify-center gap-2 items-center">
                      <div
                        onClick={() => setEdit2(true)}
                        className="border-b border-black"
                      >
                        Edit
                      </div>
                      {edit2 && (
                        <div
                          onClick={sendDetails2}
                          className="text-white rounded-3xl bg-[#0069FF] p-1 px-3"
                        >
                          Save Changes
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full flex-col gap-2">
                    <div className="flex justify-center w-full flex-col">
                      <div className="font-semibold pb-1">Address</div>
                      <div className="w-full">
                        {edit2 ? (
                          <input
                            type="text"
                            value={settings.storeAddress}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                storeAddress: e.target.value,
                              })
                            }
                            className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                            placeholder="Enter FullName"
                          />
                        ) : (
                          <div className="w-full py-1">
                            {settings.storeAddress}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 w-full">
                      <div className="flex justify-center w-full flex-col">
                        <div className="font-semibold pb-1">City</div>
                        <div className="w-full">
                          {edit2 ? (
                            <input
                              value={settings.city}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  city: e.target.value,
                                })
                              }
                              type="text"
                              className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                              placeholder="Enter FullName"
                            />
                          ) : (
                            <div className="w-full py-1">{settings.city}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center w-full flex-col">
                        <div className="font-semibold pb-1">State</div>
                        <div className="w-full">
                          {edit2 ? (
                            <input
                              value={settings.state}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  state: e.target.value,
                                })
                              }
                              type="text"
                              className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                              placeholder="Enter FullName"
                            />
                          ) : (
                            <div className="w-full py-1">{settings.state}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 w-full">
                      <div className="flex justify-center w-full flex-col">
                        <div className="font-semibold pb-1">Postal Code</div>
                        <div className="w-full">
                          {edit2 ? (
                            <input
                              value={settings.postalCode}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  postalCode: e.target.value,
                                })
                              }
                              type="number"
                              className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                              placeholder="Enter FullName"
                            />
                          ) : (
                            <div className="w-full py-1">
                              {settings.postalCode}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center w-full flex-col">
                        <div className="font-semibold pb-1">
                          Famous Landmark
                        </div>
                        <div className="w-full">
                          {edit2 ? (
                            <input
                              type="text"
                              value={settings.landmark}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  landmark: e.target.value,
                                })
                              }
                              className="bg-[#F1F1F1] border-2 w-full outline-none rounded-xl focus:border-blue-500 p-2"
                              placeholder="Enter FullName"
                            />
                          ) : (
                            <div className="w-full py-1">
                              {settings.landmark}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 pn:max-sm:hidden">
                <div className="flex justify-center  items-center w-full p-3 rounded-lg border-2">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <div>
                        <Image src={s1} alt="image" />
                      </div>
                      <div className="text-xl font-semibold">
                        Why isn’t my info shown here?
                      </div>
                      <div className="text-sm">
                        We’re hiding some account details to protect your
                        identity.
                      </div>
                    </div>
                    <div className="w-full h-[2px] bg-black"> </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <Image src={s2} alt="image" />
                      </div>
                      <div className="text-xl font-semibold">
                        Which details can be edited?Which details can be edited?
                      </div>
                      <div className="text-sm">
                        Details Airbnb uses to verify your identity can’t be
                        changed. Contact info and some personal details can be
                        edited, but we may ask you verify your identity the next
                        time you book or create a listing.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default page;
