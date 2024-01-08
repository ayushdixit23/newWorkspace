"use client";
import Lottie from "lottie-react";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { lottieReducer } from "../redux/slice/reduxSlice";

const Lotties = () => {
  const [l, setL] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${API}/getLottie`)
      .then((res) => {
        setL(res.data.findlottie[0].lottieFile);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      onClick={() => dispatch(lottieReducer(l))}
      //   onClick={() => dispatch(lottieReducer(JSON.parse(l.toString())))}
      style={{ width: "500px", height: "500px", cursor: "pointer" }}
    >
      {l && (
        <Lottie animationData={JSON.parse(l.toString())} size={200}></Lottie>
      )}
    </div>
  );
};

export default Lotties;
