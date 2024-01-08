"use client";
import { QRCodeSVG } from "qrcode.react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { database } from "@/firebase.config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { RiLoader4Line } from "react-icons/ri";
import { useLoginWithQrMutation } from "@/app/redux/apiroutes/userLoginAndSetting";
import { decryptaes } from "@/app/utils/security";
import { useDispatch } from "react-redux";
import { changelaoding } from "@/app/redux/slice/userData";
import useTokenAndData from "@/app/utils/tokens";

function QRCodeComponent() {
  const [qrCodeValue, setQRCodeValue] = useState("");
  const newRandomString = generateRandomString(17);
  const starCountRef = ref(database, `/qr/`);
  const strignref = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [qrlogin] = useLoginWithQrMutation();
  const { generateData } = useTokenAndData();
  const router = useRouter();

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
    <>
      <div className="flex gap-3 justify-center items-center flex-col">
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

        <div className="text-2xl font-semibold">Log in with QR code</div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="max-w-[70%] text-center">
            Open Grovyo app to scan this code to log in instantly
          </div>
          <div>
            <button className="text-sm text-white p-3 px-4 rounded-lg bg-[#0066FF]">
              Log in with phone number
            </button>
          </div>
          <div className="text-sm">
            Ready to get started?{" "}
            <span className="text-[#0066FF]">Create account</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default QRCodeComponent;
