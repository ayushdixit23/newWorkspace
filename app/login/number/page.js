"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { auth } from "../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/Essentials";
import { CgSpinner } from "react-icons/cg";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { changelaoding } from "@/app/redux/slice/userData";
import { encryptaes } from "@/app/utils/security";
import { useLoginMutation } from "@/app/redux/apiroutes/userLoginAndSetting";
import { QRCodeSVG } from "qrcode.react";
import { RiLoader4Line } from "react-icons/ri";
import { database } from "@/firebase.config";
import { useLoginWithQrMutation } from "@/app/redux/apiroutes/userLoginAndSetting";
import useTokenAndData from "@/app/utils/tokens";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

function page() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = Array.from({ length: 6 }, () => React.createRef());
  const otpElementRef = useRef(null);
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [come, setCome] = useState(0);
  const [change, setChange] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [load, setLoad] = useState(false);
  const [tokens, setTokens] = useState({
    refresh_token: "",
    access_token: "",
  });
  const [code, setCode] = useState("")
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setOtp((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });

    if (value === "" && index > 0) {
      otpInputRefs[index - 1].current.focus();
    } else if (value !== "" && index < 5) {
      otpInputRefs[index + 1].current.focus();
    }
  };


  useEffect(() => {
    const finalOTP = otp.join("");
    setOTP(finalOTP);
    const otpElement = otpElementRef.current;

    if (otpElement) {
      otpElement.innerText = finalOTP;

      if (finalOTP.length === 6) {
        otpElement.classList.replace("_notok", "_ok");
      } else {
        otpElement.classList.replace("_ok", "_notok");
      }
    }
  }, [otp]);

  useEffect(() => {
    let interval;
    if (seconds === 0) {
      setSeconds(0);
      setIsActive(true);
      setCome(come + 1);
    }
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      if (seconds === 0) {
        setSeconds(0);
        setCome(1);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    onSignup();
    setSeconds(30);
  };

  const waitkrnevalafunc = async (data) => {
    try {
      setTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      Cookies.set("excktn", data.access_token);
      Cookies.set("frhktn", data.refresh_token);
      Cookies.set("work_grip", data.endata);
      toast.success("success");
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchid = async () => {
    try {
      console.log("first")
      const en = encryptaes(number);

      const result = await login({
        phone: en,
      });
      console.log(result)
      if (result.data?.success) {
        const a = await waitkrnevalafunc(result.data);
        if (a === true) {
          dispatch(
            changelaoding({
              loading: true,
              path: `/main/dashboard`,
            })
          );
        }
      } else {
        toast.error("You Dont have Account");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const access_token = Cookies.get("excktn");
    const refresh_token = Cookies.get("frhktn");
    if (access_token && refresh_token) {
      try {
        setTokens({ access_token, refresh_token });
      } catch (error) {
        console.error("Error parsing tokens from cookie:", error);
      }
    }
  }, []);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask the user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();
    setSeconds(30);
    const appVerifier = window.recaptchaVerifier;

    const formatPh = number;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("Successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(OTP)
      .then(async (res) => {
        setLoading(false);
        fetchid();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  const handleCreate = async () => {
    setLoad(true);

    const isValidEmail = email;

    try {
      if (!email.trim() || !pass.trim()) {
        setToast({
          appear: true,
          text: "Please Enter the Email and Password",
          success: false,
        });
        setTimeout(() => {
          setToast({ appear: false });
        }, 1500);
      } else {
        if (pass.length < 8) {
          setToast({
            appear: true,
            text: "Please Enter More then 8 Characters in Password",
            success: false,
          });
          setTimeout(() => {
            setToast({ appear: false });
          }, 1500);
        } else {
          if (isValidEmail) {
            const res = await axios.post(`${API} / v1 / checkacc`, {
              email,
              password: pass,
              loc,
              device,
              contacts: contactList,
              type: "login",
              time: `${Date.now()}`,
              token,
            });
            if (res.data.success) {
              if (res.data.userexists) {
                await sessionStorage.setItem("id", res.data.user._id);
                await sessionStorage.setItem("pic", res.data.pic);
                await sessionStorage.setItem(
                  "fullname",
                  res.data.user.fullname
                );
                await sessionStorage.setItem(
                  "username",
                  res.data.user.username
                );
                router.push("../main/dashboard");
                toast.success("Successfully!");
              } else {
                toast.apply("Seems like you don't have an account in the app.");
                router.push("../login/singUp");
              }
            } else {
              setToast({
                appear: true,
                text: "Something went wrong",
                success: false,
              });
              setTimeout(() => {
                setToast({ appear: false });
              }, 2000);
            }
          } else {
            setToast({
              appear: true,
              text: "Please Enter correct email",
              success: false,
            });
            setTimeout(() => {
              setToast({ appear: false });
            }, 1500);
          }
        }
      }
    } catch (e) {
      console.log(e);
      setLoad(false);
    }
    setLoad(false);
  };

  const [qrCodeValue, setQRCodeValue] = useState("");
  const newRandomString = generateRandomString(17);
  const starCountRef = ref(database, `/qr/`);
  const strignref = useRef(null);
  const [qrlogin] = useLoginWithQrMutation();
  const { generateData } = useTokenAndData();

  function generateRandomString(length) {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return randomString;
  }

  const writeUserData = useCallback(async (newRandomString) => {
    set(ref(database, `/qr/${newRandomString}/`), { data: "null" });
  }, []);

  const updateRandomString = useCallback(() => {
    strignref.current = newRandomString;
    setQRCodeValue(newRandomString);
    writeUserData(newRandomString);
  }, []);

  const dologin = async (data) => {
    try {
      Cookies.set("excktn", data?.access_token);
      Cookies.set("frhktn", data?.refresh_token);
      Cookies.set("work_grip", data?.endata);
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateRandomString();
    // const intervalId = setInterval(updateRandomString, 60000);
    const unsub = onValue(starCountRef, async (snapshot) => {
      const data = snapshot.val();
      if (
        strignref.current &&
        data[strignref.current]?.data !== "null" &&
        loading === false
      ) {
        const fd = decryptaes(data[strignref.current]?.data);

        setLoading(true);
        if (fd) {
          const dataforSend = JSON.parse(fd);
          const res = await qrlogin({
            id: dataforSend?.id,
          });
          if (res.data?.success) {
            const check = await dologin(res.data);
            console.log(check);
            setTimeout(async () => {
              await generateData(res.data?.access_token);

              router.push("/main/dashboard");
              setTimeout(() => {
                const reref = ref(database, `/qr/${strignref.current}/`);
                remove(reref)
                  .then(() => {
                    console.log("Data deleted successfully");
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error deleting data:", error.message);
                  });
              }, 2000);
            }, 3000);
          }
        }
      }
    });

    return () => {
      unsub();
      //  clearInterval(intervalId);
    };
  }, []);


  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />

      <div id="recaptcha-container"></div>
      {showOTP ? (
        // OTP
        <div className="items-center flex flex-col justify-between">
          <div className="font-bold  pn:max-sm:text-[30px] text-[25px] text-[#313C58] ">
            Verification
          </div>
          <div className="flex flex-col py-2 justify-center items-center">
            <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[12px] ">
              We’re sending an SMS to phone number
            </div>
            <div className="text-[#96A0AD] pn:max-sm:text-[12px] text-[15px] ">
              <span className="text-[#0075FF]">{number}</span> Wrong Number ?
            </div>
          </div>

          <>
            <div className="mx-auto max-w-md w-full  flex justify-center gap-2 p-10">
              {otp.map((value, inde) => (
                <div key={inde}>
                  <input
                    key={`otp - field - ${inde}`}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        onOTPVerify();
                      }
                    }}
                    className="otp__digit otp__field md:hidden outline-slate-200 bg-slate-100 h-[50px] w-[50px] rounded-2xl flex justify-center items-center text-center text-[#3e3e3e]"
                    value={value}
                    onChange={(event) => handleInputChange(event, inde)}
                    ref={otpInputRefs[inde]}
                    maxLength="1"
                    type="number"
                  />
                  <input
                    key={`otp - field - ${inde + 1} `}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        onOTPVerify();
                      }
                    }}
                    className="otp__digit otp__field pn:max-md:hidden outline-slate-200 bg-slate-100 h-[50px] w-[50px] rounded-2xl flex justify-center items-center text-center text-[#3e3e3e]"
                    value={value}
                    onChange={(event) => handleInputChange(event, inde)}
                    ref={otpInputRefs[inde]}
                    maxLength="1"
                  />
                </div>
              ))}
            </div>
          </>
          <div className="text-black font-semibold flex text-[15px] pt-8">
            <div className="text-center">
              {come === 1 ? (
                <div className="space-x-4 flex ">
                  <div className="text-[#3e3e3e]">
                    Don't receive code ?{" "}
                    <button
                      className={` text - blue - 600 rounded ${isActive ? "" : ""
                        } `}
                      onClick={toggleTimer}
                    >
                      Request Again
                    </button>
                  </div>
                </div>
              ) : (
                <h1
                  className={`${come === 1 ? "hidden" : "text-[16px] text-[#3e3e3e]"
                    } `}
                >
                  Resend: 00:{seconds}
                </h1>
              )}
            </div>
          </div>
          <div
            onClick={onOTPVerify}
            className="h-[50px] w-[250px] select-none cursor-pointer bg-black mt-8 flex items-center justify-center rounded-2xl text-white"
          >
            {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
            <span className={`${loading ? "hidden" : ""} `}>Continue</span>
          </div>
        </div>
      ) : (
        // Phone
        <div className="flex flex-col justify-between items-center">
          <div className="mb-5 flex gap-3 justify-center items-center flex-col">
            <div className="relative">
              <QRCodeSVG
                style={{
                  width: "200px",
                  height: "200px",
                }}
                value={qrCodeValue}
              />
              {loading && (
                <div className="w-[200px] bg-white opacity-50 absolute top-0 left-0 h-[200px] flex justify-center items-center ">
                  <div className="animate-spin">
                    <RiLoader4Line className="text-3xl" />
                  </div>
                </div>
              )}
            </div>

            <div className="text-xl font-semibold">Sign in with QR code</div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="max-w-[70%] text-sm text-[#9095A0] text-center">
                Use your phone camera to scan this code to log in instanly
              </div>
            </div>
          </div>
          {/* <div className="font-bold text-center pn:max-sm:text-[30px] text-[25px] font-fugaz text-[#171717] ">
            Start your Adventure.
            <span className="text-[#0075ff]">Let's Begin!</span>
          </div>
          <div className="flex flex-col justify-center items-center  py-2">
            <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[12px] text-center px-10">
              We've missed you! Please sign in to catch up on what you've missed
            </div>
          </div> */}

          <div className="flex items-center justify-center w-full">
            <hr className="flex-grow border-t text-[#9095A0] border-[#9095A0] " />
            <span className="px-3 font-medium text-[#9095A0] bg-white ">
              or Sign in with
            </span>
            <hr className="flex-grow border-t text-[#9095A0] border-[#9095A0]" />
          </div>

          {/* switcher */}

          <div className="grid grid-cols-1 w-full md:w-[90%]">
            <div className=" w-full flex rounded-xl dark:text-[#171717] select-none text-[14px]">
              <div
                onClick={() => {
                  setChange(1);
                }}
                className={`m-1 flex justify-center transition-all duration-700 items-center h-8 w-full z-10 ${change === 1 ? 'font-bold border-b-2 border-blue-600' : 'cursor-pointer'
                  }`}
              >
                Phone no.
              </div>
              <div
                onClick={() => {
                  setChange(2);
                }}
                className={`m-1 flex justify-center transition-all duration-700 items-center h-8 w-full z-10 ${change === 2 ? 'font-bold border-b-2 border-blue-600' : 'cursor-pointer'
                  }`}
              >
                Email
              </div>
            </div>


          </div>

          {/* phone */}
          <div
            className={`${change === 1
              ? "flex justify-start flex-col  items-start  py-4"
              : "hidden"
              } `}
          >
            <div className="bg-[#f7f7f7] flex items-center justify-center rounded-2xl">

              <PhoneInput
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSignup();
                  }
                }}
                country={'in'}
                value={number}
                onChange={(value, data, event) => setNumber(value)}
                placeholder="Phone no."

                inputProps={{ required: true }}
              />

              {/* <input
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSignup();
                  }
                }}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Phone no."
                className="h-[50px] w-[260px] text-[#171717] outline-none bg-[#f7f7f7] rounded-r-2xl px-2 p-2 "
              /> */}
            </div>
          </div>
          <div className={`${change === 1 ? "py-5 " : "hidden"} `}>
            <div
              // onClick={onSignup}
              onClick={fetchid}
              className="h-[50px] w-[300px] select-none cursor-pointer bg-black  flex items-center justify-center rounded-2xl text-white "
            >
              {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
              <span className={`${loading ? "hidden" : ""} `}>Send Otp</span>
            </div>
          </div>
          {/* email */}
          <div className={`${change === 2 ? "" : "hidden"} `}>
            <div>
              <div className="text-black pn:max-sm:text-[15px] text-[15px] py-2">
                Email
              </div>

              <input
                className="py-3 w-[300px] ring-1 ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100 "
                placeholder="Enter your email"
              />
            </div>
            <div>
              <div className="text-black pn:max-sm:text-[15px] text-[15px] py-2">
                Password
              </div>

              <input
                className="py-3 w-[300px] ring-1 ring-[#f5f5f5] bg-[#f7f7f7] rounded-2xl px-4 outline-slate-100 "
                placeholder="Enter your Password"
              />
            </div>
            <div className="py-5 ">
              <div
                onClick={handleCreate}
                className="py-3 w-[300px] select-none cursor-pointer bg-black  flex items-center justify-center rounded-2xl text-white "
              >
                <span>Continue</span>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default page;
