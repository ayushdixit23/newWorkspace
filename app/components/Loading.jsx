"use client";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import aesjs from "aes-js";
import { Key } from "@/Essentials";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useCallback } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { changelaoding, sendData } from "../redux/slice/userData";
import { decryptaes } from "../utils/security";
import { useGetRefreshTokenMutation } from "../redux/apiroutes/userLoginAndSetting";

const Loading = ({ children }) => {
  const load = useSelector((state) => state.userData.loading);
  const path = useSelector((state) => state.userData.path);
  const { generateData } = useGetDecryptedData(path);

  useEffect(() => {
    const t = Cookies.get("work_grip");
    if (t) {
      generateData(t);
    }
  }, [generateData, load]);

  return (
    <>
      {load ? (
        <div className="flex justify-center items-center h-screen">
          Old Loading...
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Loading;

//for decrypting data
const useGetDecryptedData = (path) => {
  const [isValid, setIsValid] = useState(false);
  const token = Cookies.get("access_token");
  const router = useRouter();
  const dispatch = useDispatch();
  const [refreshedtokenAgain] = useGetRefreshTokenMutation();

  const refreshAccessToken = async (refreshToken) => {
    try {
      const res = await refreshedtokenAgain({
        refresh_token: refreshToken,
      });
      const { access_token, success } = res.data;
      if (success) {
        return { access_token, refresh_token: refreshToken };
      } else {
        console.error("Failed to refresh token");
        return Promise.reject("Failed to refresh token");
      }
    } catch (err) {
      console.error(err);
      return Promise.reject("Failed to refresh token");
    }
  };

  const refresh = async () => {
    // Retrieve the refresh token from wherever it's stored
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) {
      console.error("No refresh token found");
      return Promise.reject("No refresh token found");
    }

    try {
      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        Cookies.set("access_token", newToken.access_token);
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  };

  const generateData = useCallback(async () => {
    const t = Cookies.get("work_grip");
    try {
      const decodedToken = jwt.decode(token, { complete: true });
      if (decodedToken && decodedToken.header && decodedToken.payload) {
        const issuedAt = decodedToken.payload.iat;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const isValidIat = issuedAt <= currentTimestamp;
        const expiration = decodedToken.payload.exp;
        const isValidExp = currentTimestamp <= expiration;
        if (isValidIat && isValidExp) {
          setIsValid(true);
          const mydec = decryptaes(t);
          const parse = JSON.parse(mydec);
          if (path) {
            router.push(`${path}`);
          }

          dispatch(
            changelaoding({
              loading: false,
            })
          );
          dispatch(sendData(parse));
        } else if (isValidIat && !isValidExp) {
          await refresh();
        } else {
          router.push("/login");
        }
      } else {
        setIsValid(false);
        Cookies.remove();
        router.push("/login");
      }
    } catch (e) {
      console.error(e);
      setIsValid(false);
      Cookies.remove();
      router.push("/login");
    }
  }, [token, path, router, isValid]);

  return { generateData, isValid };
};
