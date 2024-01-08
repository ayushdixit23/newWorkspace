import Image from "next/image";
import React from "react";
import testing from "../assets/testing.png";

const page = () => {
  return (
    <>
      <div className="flex justify-center items-center p-2 sm:h-screen w-full ">
        <div className="grid sm:grid-cols-2 max-w-[1280px]">
          <div className="flex pn:max-sm:order-2 p-3 justify-center items-center">
            <div className="flex flex-col gap-3">
              <div className="md:text-[50px] text-2xl pp:text-4xl text-[#1E255E] font-bold sm:leading-snug sm:tracking-wider">
                Design driven development of your web product
              </div>
              <div className="text-[#1E255E] text-sm">
                We are a full service digital agency that builds immesive user
                experience.
              </div>
              <div className="flex items-center">
                <button className="bg-[#17A4D0] text-xs rounded-full text-white p-2 px-5">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex p-3 justify-center items-center">
              <Image
                src={testing}
                alt="image"
                className="sm:max-w-[600px] min-w-[200px] w-full sm:max-h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
