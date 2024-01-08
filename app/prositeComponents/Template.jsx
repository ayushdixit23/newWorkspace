"use client";
import React, { useEffect, useRef, useState } from "react";
import img from "../assets/image/emptycom.png";
import Image from "next/image";
import axios from "axios";
import { API } from "@/Essentials";
import { useDispatch, useSelector } from "react-redux";
// import Lotties from "./Lotties";
// import Lottie from "lottie-react";
import { donewala1, donewala2, setData } from "../redux/slice/reduxSlice";
const Template = () => {
  const [post, setPost] = useState("");
  const data = useSelector((state) => state.prosite?.data);
  const [name, setName] = useState("New col");
  const [fileToSend, setFileToSend] = useState(null);
  const dispatch = useDispatch();
  const selector1 = useSelector((state) => state.prosite?.image);
  const selector2 = useSelector((state) => state.prosite?.button);
  const selector3 = useSelector((state) => state.prosite);
  const selector4 = useSelector((state) => state.prosite?.background);
  const selector5 = useSelector((state) => state.prosite?.lottie);
  const buttonSelector = useSelector((state) => state.data?.buttonDetails);
  const f1ref = useRef();
  const f2ref = useRef();
  const msg = useSelector((state) => state.prosite?.msg);
  const backColor = useSelector((state) => state.prosite?.backcolor);
  const textcolor = useSelector((state) => state.prosite?.textcolor);
  const bc = useSelector((state) => state.prosite?.button.bg);

  // const changeBackgroundColor = () => {
  //   // Update the background color state when a button is clicked
  //   setBackgroundColor("bg-green-500");
  //   setText("text-white");
  //   setButton1("bg-green-300 p-2 px-6 rounded-md");
  // };
  // const change = () => {
  //   // Update the background color state when a button is clicked
  //   setButton("bg-blue-200 p-2 px-1 rounded-md");
  // };

  const fun = async () => {
    const jsxString = `
  	<html>
  	<head>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.5/lottie.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.8/lottie-player.min.js"></script>
  	</head>
  	<body>
  	<div  style="
  	background-image: url(${selector4});
  	background-color: ${backColor};
  	background-size: cover;
  	color: ${textcolor};
  	background-position: center;
  	">
  	<div class="flex justify-center lg:bg-blue-300 items-center">
  	  <div class="border-2">
  		<div class="flex justify-around items-center max-w-[700px] min-h-[450px]">
  		  <div class="flex flex-col p-4 gap-4">
  			<div style="
  			font-size: ${selector3?.size};
  			font-family: ${selector3?.family};
  			text-shadow: ${selector3?.shadow};
  			font-weight: ${selector3?.weight};
  		  " class="text-sm">${name}</div>
  			<div  style="
  			font-size: ${selector3?.size};
  			font-family: ${selector3?.family};
  			text-shadow: ${selector3?.shadow};
  			font-weight: ${selector3?.weight};
  		  " class="text-2xl font-semibold">${name1}</div>
  			<div  style="
  			font-size: ${selector3?.size};
  			font-family: ${selector3?.family};
  			text-shadow: ${selector3?.shadow};
  			font-weight: ${selector3?.weight};
  		  ">
  			  We know how large objects will act, but things on a small
  			  scale.
  			</div>
  			<div>
  			  <button style="
  			  background: ${selector2?.bg || bc};
  			  color: ${selector2?.color};
  			  padding: ${selector2?.pad};
  			  box-shadow: ${selector2?.boxShadow};
  			  border-radius: ${selector2?.borderRadius};
  			  font-weight: ${selector2?.weight};
  			  border-bottom: ${selector2?.borderBottom};
  			  ">
  				LEARN MORE
  			  </button>
  			</div>
  		  </div>
  		  <div>
  			<img src=${selector1} style="width:100px" alt="img" />
  		  </div>

  		  </div>
  	  </div>
  	</div>
    </div>
    </body>
    </html>
  	`;
    try {
      setPost(jsxString); // Update the state AFTER the axios request is successful
      setIdd(1);

      await axios.post(`${API}/temp`, {
        post: jsxString,
        idd: idd,
      });
      prosite();
    } catch (e) {
      console.error("Plz error mt dena", e);
    }
  };

  const prosite = async () => {
    try {
      const response = await axios.get(`${API}/fetchData`);
      dispatch(setData([response?.data]));
      // console.log(response.data); // Use response.data to access the response data
    } catch (e) {
      console.log("Error:", e);
    }
  };

  useEffect(() => {
    prosite();
  }, []);

  const [name1, setName1] = useState("text");
  const [idd, setIdd] = useState(0);
  const [setNm, setSetNm] = useState("");

  // const fun = async () => {
  //   const jsxString = `
  //   <html>
  //   <head>
  //   <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.5/lottie.min.js"></script>
  //   <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.8/lottie-player.min.js"></script>
  //   </head>
  //   <body>
  //   <div  style="
  //   background-image: url(${selector4});
  //   background-size: cover;
  //   background-position: center;
  //   ">
  //   <div class="flex justify-center lg:bg-black items-center">
  //     <div class="border-2">
  //       <div class="flex justify-around items-center max-w-[700px] min-h-[450px] ${text}">
  //         <div class="flex flex-col p-4 gap-4">
  //           <div style="
  //           font-size: ${selector3?.size};
  //           font-family: ${selector3?.family};
  //           text-shadow: ${selector3?.shadow};
  //           font-weight: ${selector3?.weight};
  //         " class="text-sm">${name}</div>
  //           <div  style="
  //           font-size: ${selector3?.size};
  //           font-family: ${selector3?.family};
  //           text-shadow: ${selector3?.shadow};
  //           font-weight: ${selector3?.weight};
  //         " class="text-2xl font-semibold">${name1}</div>
  //           <div  style="
  //           font-size: ${selector3?.size};
  //           font-family: ${selector3?.family};
  //           text-shadow: ${selector3?.shadow};
  //           font-weight: ${selector3?.weight};
  //         ">
  //             We know how large objects will act, but things on a small
  //             scale.
  //           </div>
  //           <div>
  //             <button style="
  //             background: ${selector2?.bg};
  //             color: ${selector2?.color};
  //             padding: ${selector2?.pad};
  //             box-shadow: ${selector2?.boxShadow};
  //             border-radius: ${selector2?.borderRadius};
  //             font-weight: ${selector2?.weight};
  //             border-bottom: ${selector2?.borderBottom};
  //             ">
  //               LEARN MORE
  //             </button>
  //           </div>
  //         </div>
  //         <div>
  //           <img src=${selector1} style="width:100px" alt="img" />
  //         </div>

  //         </div>
  //     </div>
  //   </div>
  // </div>
  // </body>
  // </html>
  //   `;
  //   try {
  //     setPost(jsxString); // Update the state AFTER the axios request is successful
  //     setIdd(1);

  //     await axios.post(`${API}/temp`, {
  //       post: jsxString,
  //       idd: idd,
  //     });
  //     prosite();
  //   } catch (e) {
  //     console.error("Plz error mt dena", e);
  //   }
  // };

  // const prosite = async () => {
  //   try {
  //     const response = await axios.get(`${API}/fetchData`);
  //     setData([response?.data]);
  //     // console.log(response.data); // Use response.data to access the response data
  //   } catch (e) {
  //     console.log("Error:", e);
  //   }
  // };

  // useEffect(() => {
  //   prosite();
  // }, []);

  // console.log(selector5);
  const handleFileChange = (e) => {
    e.preventDefault();
    setFileToSend(e.target.files[0]);
  };
  const sendFile = async () => {
    try {
      const formDataToSend = await new FormData();
      await formDataToSend.append("lottieFile", fileToSend);
      const data = await axios.post(`${API}/lottie`, formDataToSend);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(selector1);
  const handleInputFocus = () => {
    dispatch(donewala1(true));
  };
  const handleInputFocus2 = () => {
    dispatch(donewala2(true));
  };

  {
    /* <script>
  var lottieContainer = document.getElementById('lottie-container');
  var animation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: "${selector5}",
      rendererSettings: {
       preserveAspectRatio: 'xMidYMid slice'
      }
  });
</script> */
  }
  // <div id="lottie-container" style="width: 500px; height: 500px;"></div>
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${selector4})`,
          backgroundColor: `${backColor}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: `${textcolor}`,
        }}
      >
        <div className="flex justify-center items-center">
          <div className={`border-2`}>
            <div
              className={`flex justify-around items-center max-w-[700px] min-h-[450px] `}
            >
              <div className="flex flex-col p-4 gap-4">
                <input
                  placeholder="SUMMER 2023"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  ref={f1ref}
                  onFocus={handleInputFocus}
                  style={{
                    fontSize: `${selector3?.font1?.size}`,
                    fontFamily: `${selector3?.font1?.family}`,
                    textShadow: `${selector3?.font1?.shadow}`,
                    fontWeight: `${selector3?.font1?.weight}`,
                  }}
                />
                <input
                  placeholder="NEW COLLECTION"
                  onFocus={handleInputFocus2}
                  onChange={(e) => setName1(e.target.value)}
                  value={name1}
                  ref={f2ref}
                  style={{
                    fontSize: `${selector3?.font2?.size}`,
                    fontFamily: `${selector3?.font2?.family}`,
                    textShadow: `${selector3?.font2?.shadow}`,
                    fontWeight: `${selector3?.font2?.weight}`,
                  }}
                />
                <div
                  style={{
                    fontSize: `${selector3?.font3?.size}`,
                    fontFamily: `${selector3?.font3?.family}`,
                    textShadow: `${selector3?.font3?.shadow}`,
                    fontWeight: `${selector3?.font3?.weight}`,
                  }}
                >
                  We know how large objects will act, but things on a small
                  scale.
                </div>
                <div>
                  {bc ? (
                    <button
                      style={{
                        background: `${bc ? bc : bc || selector2?.bg}`,
                        color: `${selector2?.color}?`,
                        padding: `${selector2?.pad}`,
                        boxShadow: `${selector2?.boxShadow}`,
                        borderRadius: `${selector2?.borderRadius}`,
                        fontWeight: `${selector2?.weight}`,
                        borderBottom: `${selector2?.borderBottom}`,
                      }}
                    >
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={buttonSelector?.link}
                      >
                        {buttonSelector.text
                          ? buttonSelector.text
                          : "LEARN MORE"}
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
              <div>
                {msg ? (
                  msg
                ) : (
                  <>
                    {/* <img src={`${selector1}`} alt="image" /> */}
                    {selector1?.length > 0 ? (
                      selector1?.map((d, i) => (
                        <img
                          src={`${d}`}
                          className="max-h-[300px]"
                          alt="image"
                        />
                      ))
                    ) : (
                      <Image src={img} alt="img" />
                    )}
                  </>
                )}
              </div>
              {/* <div
                style={{ width: "200px", height: "200px", minWidth: "200px" }}
              >
                {selector5 && (
                  <Lottie animationData={JSON.parse(selector5.toString())} />
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>{" "}
      {/* <button
        className="mt-4 px-4 py-2 bg-[#3e3e3e] text-white rounded hover:bg-blue-700 flex"
        onClick={changeBackgroundColor}
      >
        <div className={`h-6 w-6 rounded-lg bg-green-500`}></div>
        <div className={`h-6 w-6 rounded-lg bg-white -ml-2`}></div>
        <div className={`h-6 w-6 rounded-lg  bg-green-300 -ml-2`}></div>
      </button>
      <button className={`${button}`} onClick={change}>
        Change button
      </button> */}
      {/* <button onClick={fun}>Save</button> */}
      {/* <Lotties /> */}
      <button onClick={fun}>Send </button>
      {data?.map((d, i) => (
        <>
          <div key={i}>
            <div dangerouslySetInnerHTML={{ __html: d?.post }} />
          </div>
        </>
      ))}
    </>
  );
};

export default Template;
