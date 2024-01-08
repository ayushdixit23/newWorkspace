import React from "react";
import circle from "../assets/image/circle.svg";
import Image from "next/image";
const Popularity = ({ state }) => {
  const rotationAngle =
    ((state.popularity ? state.popularity : 0) / 100) * 180 - 90;
  return (
    <>
      <div className="rounded-xl w-full p-3 bg-white flex flex-col gap-3 sm:min-w-[300px] flex-grow sm:bg-[#F9F9F9]">
        <div className="flex justify-between items-center p-1 px-3">
          <div className="">Popularity</div>
          <div className="text-2xl font-bold">
            {state?.popularity ? state?.popularity : 0}%
          </div>
        </div>
        <div className="flex justify-center  h-fit items-center">
          {/* speed meter */}
          <div className="relative sm:min-w-[300px]">
            <div>
              <Image src={circle} alt="circle" />
            </div>

            <div
              className={`${
                (state.popularity ? state.popularity : 0) >= 0 &&
                (state.popularity ? state.popularity : 0) <= 50
                  ? "bg-[#ff718b]"
                  : null
              } ${
                (state.popularity ? state.popularity : 0) > 50 &&
                (state.popularity ? state.popularity : 0) <= 65
                  ? "bg-[#FCB5C3]"
                  : null
              } ${
                (state.popularity ? state.popularity : 0) > 65 &&
                (state.popularity ? state.popularity : 0) <= 80
                  ? "bg-[#fce83a]"
                  : null
              } ${
                (state.popularity ? state.popularity : 0) > 80 &&
                (state.popularity ? state.popularity : 0) <= 100
                  ? "bg-[#7fe47e]"
                  : null
              }  flex top-32 left-[132px] flex-col gap-2 justify-center items-center w-3 h-3 rounded-full absolute`}
            >
              <div
                style={{
                  transformOrigin: "bottom left",
                  transform: `rotate(${rotationAngle}deg)`,
                }}
                className="relative flex justify-center items-center duration-700 transition transform rotate-45 origin-bottom-left"
              >
                <div
                  className={`${
                    (state.popularity ? state.popularity : 0) >= 0 &&
                    (state.popularity ? state.popularity : 0) <= 50
                      ? "bg-[#ff718b]"
                      : null
                  } ${
                    (state.popularity ? state.popularity : 0) > 50 &&
                    (state.popularity ? state.popularity : 0) <= 65
                      ? "bg-[#FCB5C3]"
                      : null
                  } ${
                    (state.popularity ? state.popularity : 0) > 65 &&
                    (state.popularity ? state.popularity : 0) <= 80
                      ? "bg-[#fce83a]"
                      : null
                  } ${
                    (state.popularity ? state.popularity : 0) > 80 &&
                    (state.popularity ? state.popularity : 0) <= 100
                      ? "bg-[#7fe47e]"
                      : null
                  } absolute bottom-0 rounded-t-full -left-[3px] h-[100px] w-2 `}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">Get suggestion to grow faster</div>
      </div>
    </>
  );
};

export default Popularity;
