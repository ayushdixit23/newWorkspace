"use client"
import React, { useEffect } from "react";
import useTokenAndData from "../utils/tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";

const TokenDataWrapper = ({ children }) => {
  const { isValid, parsedData } = useTokenAndData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isValid) {
      dispatch(changelaoding({ loading: false }));
      dispatch(sendData(parsedData));
    }
  }, [isValid, parsedData, dispatch]);
  return <>{children}</>;
};

export default TokenDataWrapper;
