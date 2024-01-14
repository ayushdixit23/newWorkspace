import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { changelaoding, sendData } from "../redux/slice/userData";
import { decryptaes } from "./security";
import { useGetRefreshTokenMutation } from "../redux/apiroutes/userLoginAndSetting";
import toast from "react-hot-toast";

const useTokenAndData = () => {
  const [isValid, setIsValid] = useState(false);
  const token = Cookies.get("excktn");
  const path = useSelector((state) => state.userData.path);
  const router = useRouter();
  const [parsedData, setParsedData] = useState(null);
  const dispatch = useDispatch();
  const [refreshedtokenAgain] = useGetRefreshTokenMutation();

  const refreshAccessToken = useCallback(async (refreshToken) => {
    try {
      const res = await refreshedtokenAgain({ refresh_token: refreshToken });
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
  }, [refreshedtokenAgain]);


  const checkRefreshTokenValidity = useCallback(() => {
    try {
      const refreshToken = Cookies.get("frhktn");
      if (!refreshToken) {
        console.error("No refresh token found");
        return false;
      }
      const decodedRefreshToken = jwt.decode(refreshToken);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expiration = decodedRefreshToken.exp;
      const isValid = currentTimestamp <= expiration;
      return isValid;
    } catch (error) {
      console.error("Error checking refresh token validity:", error);
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    const refreshToken = Cookies.get("frhktn");
    if (!refreshToken) {
      console.error("No refresh token found");
      return Promise.reject("No refresh token found");
    }

    try {
      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        Cookies.set("excktn", newToken.access_token);
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  }, [refreshAccessToken]);

  const generateData = useCallback(
    async (qrtoken) => {
      const t = Cookies.get("work_grip");
      try {
        const decodedToken = jwt.decode(token || qrtoken, { complete: true });
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
            setParsedData(parse);
            dispatch(changelaoding({ loading: false }));
            dispatch(sendData(parse));
            console.log("runned 1");
            if (path) {
              router.push(`${path}`);
            }
          } else if (checkRefreshTokenValidity()) {
            await refresh();
          } else {
            Cookies.remove("work_grip");
            Cookies.remove("frhktn");
            console.log("runned 2");
            Cookies.remove("excktn");
          }
        } else {
          setIsValid(false);
          Cookies.remove("work_grip");
          Cookies.remove("frhktn");
          Cookies.remove("excktn");
          console.log("runned 3");
          toast.error("Log in Session Expired");
        }
      } catch (e) {
        console.error(e);
        setIsValid(false);
        Cookies.remove("work_grip");
        Cookies.remove("frhktn");
        Cookies.remove("excktn");
        console.log("runned 4");
        toast.error("Log in Session Expired");
      }
    },
    [token]
  );

  useEffect(() => {
    generateData();

  }, [token, dispatch, generateData]);

  return { isValid, parsedData, generateData };
};

export default useTokenAndData;
