"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import testing from "../assets/testing.png";
import { useDispatch, useSelector } from "react-redux";
import { donewala1, donewala2, setData } from "../redux/slice/reduxSlice";

const Templates = () => {
  const [change, setChange] = useState({
    c1: "Design driven development of your web product",
    c2: "We are a full service digital agency that builds immesive user experience.",
  });
  const data = useSelector((state) => state.prosite?.data);
  // const [fileToSend, setFileToSend] = useState(null);
  const dispatch = useDispatch();
  const alldata = useSelector((state) => state.prosite);
  const buttonSelector = useSelector((state) => state.data?.buttonDetails);
  const f1ref = useRef();
  const f2ref = useRef();
  const msg = useSelector((state) => state.prosite?.msg);
  const backColor = useSelector((state) => state.prosite?.backcolor);
  const textcolor = useSelector((state) => state.prosite?.textcolor);
  const bc = useSelector((state) => state.prosite?.button.bg);
  const newData = useSelector((state) => state.data.template);

  //   const prosite = async () => {
  //     try {
  //       const response = await axios.get(`${API}/fetchData`);
  //       dispatch(setData([response?.data]));
  //     } catch (e) {
  //       console.log("Error:", e);
  //     }
  //   };

  //   useEffect(() => {
  //     prosite();
  //   }, []);
  // const handleFileChange = (e) => {
  //   e.preventDefault();
  //   setFileToSend(e.target.files[0]);
  // };
  // const sendFile = async () => {
  //   try {
  //     const formDataToSend = await new FormData();
  //     await formDataToSend.append("lottieFile", fileToSend);
  //     const data = await axios.post(`${API}/lottie`, formDataToSend);
  //     console.log(data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleInputFocus = () => {
    dispatch(donewala1(true));
  };
  const handleInputFocus2 = () => {
    dispatch(donewala2(true));
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${alldata?.background})`,
          backgroundColor: `${backColor}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: `${textcolor}`,
        }}
        className="flex justify-center border-8 border-red-800 items-center p-2 sm:h-screen w-full "
      >
        <div className="grid sm:grid-cols-2 max-w-[1280px]">
          <div className="flex pn:max-sm:order-2 p-3 border-2 border-black justify-center items-center">
            <div className="flex flex-col justify-end min-w-[60%] gap-3">
              {/* <div className="md:text-[50px] text-2xl pp:text-4xl text-[#1E255E] font-bold sm:leading-snug sm:tracking-wider">
                Design driven development of your web product
              </div> */}
              <textarea
                type="text"
                ref={f1ref}
                onFocus={handleInputFocus}
                style={{
                  fontSize: `${alldata?.font1?.size}`,
                  fontFamily: `${alldata?.font1?.family}`,
                  textShadow: `${alldata?.font1?.shadow}`,
                  fontWeight: `${alldata?.font1?.weight}`,
                }}
                className="md:text-[50px] text-2xl no-scrollbar bg-transparent pp:text-4xl text-[#1E255E] font-bold sm:leading-snug sm:tracking-wider"
                value={change.c1}
                onChange={(e) => setChange({ ...change, c1: e.target.value })}
              />
              {/* <div className="text-[#1E255E] text-sm">
                We are a full service digital agency that builds immesive user
                experience.
              </div> */}
              <textarea
                ref={f2ref}
                style={{
                  fontSize: `${alldata?.font2?.size}`,
                  fontFamily: `${alldata?.font2?.family}`,
                  textShadow: `${alldata?.font2?.shadow}`,
                  fontWeight: `${alldata?.font2?.weight}`,
                }}
                type="text"
                onFocus={handleInputFocus2}
                value={change.c2}
                className="text-[#1E255E] no-scrollbar leading-snug bg-transparent text-sm"
                onChange={(e) => setChange({ ...change, c2: e.target.value })}
              />
              {/* <div className="flex items-center">
                <button
                  style={{
                    background: `${bc ? bc : bc || alldata?.button?.bg}`,
                    color: `${alldata?.button?.color}?`,
                    padding: `${alldata?.button?.pad}`,
                    boxShadow: `${alldata?.button?.boxShadow}`,
                    borderRadius: `${alldata?.button?.borderRadius}`,
                    fontWeight: `${alldata?.button?.weight}`,
                    borderBottom: `${alldata?.button?.borderBottom}`,
                  }}
                  className="bg-[#17A4D0] text-xs rounded-full text-white p-2 px-5"
                >
                  Contact Us
                </button>
              </div> */}
              <div>
                {bc ? (
                  <button
                    style={{
                      background: `${bc ? bc : bc || alldata?.button?.bg}`,
                      color: `${alldata?.button?.color}?`,
                      padding: `${alldata?.button?.pad}`,
                      boxShadow: `${alldata?.button?.boxShadow}`,
                      borderRadius: `${alldata?.button?.borderRadius}`,
                      fontWeight: `${alldata?.button?.weight}`,
                      borderBottom: `${alldata?.button?.borderBottom}`,
                    }}
                  >
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={buttonSelector?.link}
                    >
                      {buttonSelector.text ? buttonSelector.text : "LEARN MORE"}
                    </a>
                  </button>
                ) : (
                  <button className="bg-cyan-400 p-3 px-6 rounded-xl text-white">
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={buttonSelector?.link}
                    >
                      {buttonSelector?.text
                        ? buttonSelector?.text
                        : "LEARN MORE"}
                    </a>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex p-3 justify-center items-center">
              {msg ? (
                msg
              ) : (
                <>
                  {/* <img src={`${alldata?.image}`} alt="image" /> */}
                  {alldata?.image ? (
                    <img src={`${alldata?.image}`} alt="image" />
                  ) : (
                    <Image
                      src={testing}
                      alt="image"
                      className="sm:max-w-[600px] min-w-[200px] w-full sm:max-h-[600px]"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {newData?.map((d, i) => (
        <div key={i}>
          <div dangerouslySetInnerHTML={{ __html: d }} />
        </div>
      ))}
    </>
  );
};

export default Templates;
