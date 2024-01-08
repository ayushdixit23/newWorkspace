import React from "react";
import testing from "../assets/testing.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="grid grid-cols-1 w-full h-[100vh] p-3">
      <div className="grid grid-cols-1 w-full">
        <div className="flex justify-center items-center">
          <div className="grid sm:grid-cols-2 w-full">
            <div className="flex justify-center items-center p-3">
              <div className="flex flex-col p-2 gap-4">
                <div className="lg:text-[50px] sm:leading-snug md:text-[44px] sm:text-3xl text-2xl font-semibold">
                  Design driven development of your web product
                </div>
                <div className="text-lg sm:text-xl">
                  We are a full service digital agency thast builds immesive
                  user experience.
                </div>
                <div>
                  <button className="p-2 px-5 rounded-xl text-white bg-black">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center ">
                <Image src={testing} alt="image" className="sm:max-w-[400px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div style="display: grid; grid-template-columns: 1fr; width: 100%; height: 100vh; padding: 3px;">
    //   <div style="display: grid; grid-template-columns: 1fr; width: 100%;">
    //     <div style="display: flex; justify-content: center; align-items: center;">
    //       <div style="display: grid; grid-template-columns: repeat(2, 1fr); width: 100%;">
    //         <div style="display: flex; justify-content: center; align-items: center; padding: 3px;">
    //           <div style="display: flex; flex-direction: column; padding: 2px; gap: 1rem;">
    //             <div style="font-size: 50px; line-height: 1.2; font-weight: 600;">
    //               Design driven development of your web product
    //             </div>
    //             <div style="font-size: 1.25rem; line-height: 1.5rem;">
    //               We are a full service digital agency that builds immersive
    //               user experience.
    //             </div>
    //             <div>
    //               <button style="padding: 0.5rem 1.25rem; border-radius: 0.5rem; color: white; background-color: black;">
    //                 Learn More
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         <div>
    //           <div style="display: flex; justify-content: center; align-items: center;">
    //             <img src={testing} alt="image" style="max-width: 400px;" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default page;
