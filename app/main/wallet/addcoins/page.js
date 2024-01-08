"use client";
import { API } from "@/Essentials";
import { Alert } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import useRazorpay from "react-razorpay";

function page() {
  const Razorpay = useRazorpay();
  const [inp, setInp] = useState();
  const [os, setOs] = useState();
  const router = useRouter();

  const handlePayment = useCallback(async () => {
    const name = sessionStorage.getItem("fullname");
    const id = sessionStorage.getItem("id");

    if (id && inp) {
      try {
        const response = await axios.post(`${API}/addmoney/${id}`, {
          amount: inp,
        });

        if (response.data.success === true) {
          const oi = response.data.oi;

          const options = {
            key: "rzp_test_dKoq1kt4NbYzD4",
            amount: inp * 100,
            currency: "INR",
            name: "Grovyo Platforms",
            description: "Test Transaction",
            image: "https://example.com/your_logo",

            handler: function (response) {
              if (response.razorpay_payment_id) {
                console.log("Payment successful!");
                setOs(true);
                try {
                  const send = async () => {
                    const res = await axios.post(
                      `${API}/updateorderstatus/${id}`,
                      { success: true, ori: oi, amount: inp }
                    );

                    if (res.data.success === true) {
                      console.log("Order status updated successfully.");
                      router.push("/main/wallet");
                    } else {
                      console.log("Failed to update order status.");
                    }
                  };
                  send();
                } catch (error) {
                  console.log(error);
                  toast.error("An error occurred while updating order status.");
                }
                toast.success("success");
              } else {
                console.log("Payment failed!");
                setOs(false);
                try {
                  const send = async () => {
                    const res = await axios.post(
                      `${API}/updateorderstatus/${id}`,
                      { success: false, ori: oi, amount: inp }
                    );
                    if (res.data.success === true) {
                      router.push("/main/wallet");
                      console.log("Order status updated successfully.");
                    } else {
                      console.log("Failed to update order status.");
                    }
                  };
                  send();
                } catch (error) {
                  console.log(error);
                  toast.error("An error occurred while updating order status.");
                }
                toast.error("failed");
              }
            },
            prefill: {
              name: name,
              email: "youremail@example.com",
              contact: "9999999999",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#313c58",
            },
          };

          const rzpay = new Razorpay(options);
          rzpay.open();
        } else {
          console.log("Add money request failed.");
          toast.error("Failed to add money.");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred.");
      }
    } else {
      toast.error("Something went wrong...");
    }
  }, [Razorpay, inp]);

  return (
    <div className="sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] overflow-auto sm:max-md:w-[90%] bg-white select-none h-[90vh] sm:rounded-[25px]">
      <div className="overflow-auto pl-3 scrollbar-hide h-full sm:mx-5 ">
        <Toaster />
        <div className="font-bold pt-8  text-[18px] sm:text-[25px]">
          <div className="">Wallet</div>
        </div>
        <div className="font-medium pt-8 text-[18px] ">
          <div className="">Enter coins</div>
        </div>
        <input
          placeholder="enter money"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
        ></input>
        <button placeholder="Add" onClick={handlePayment}>
          Add
        </button>
      </div>
    </div>
  );
}

export default page;
