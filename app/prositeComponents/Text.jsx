"use client";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { API } from "@/Essentials";
import { useDispatch } from "react-redux";
import {
  backgroundReducer,
  buttonReducer,
  imageReducer,
  msg,
} from "../redux/slice/reduxSlice";
import { buttonData } from "../redux/slice/dataSlice";

const Text = () => {
  // const [slide, setSlide] = useState(true);
  const [change, setChange] = useState(1);
  const [button, setButton] = useState([]);
  const [image, setImage] = useState([]);
  const [devpost, setDevPost] = useState([]);
  const [background, setBackground] = useState([]);
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [buttonDetails, setButtonDetails] = useState({
    text: "",
    link: "",
  });
  const dispatch = useDispatch();

  const createImage = (newImage) => axios.post(`${API}/uploadbase64`, newImage);

  const createPost = async (post) => {
    try {
      await createImage(post);
      setPostImage({ myFile: "" });
      console.log("first");
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postImage.myFile) return;
    createPost(postImage);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  useEffect(() => {
    axios
      .get(`${API}/getButton`)
      .then((res) => {
        setButton(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchPost = () => {
    axios
      .get(`${API}/getimage`)
      .then((res) => {
        // console.log(res.data);
        setImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/getDevPost`)
      .then((res) => {
        setDevPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/getBackground`)
      .then((res) => {
        setBackground(res.data.find);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {/* <div className="relative">
        <div
          className={`absolute w-full duration-700 top-0 ${
            slide ? "left-0" : "-left-[600px]"
          }`}
        > */}
      <div className="sm:w-[400px] w-screen min-h-screen bg-[#252627] text-white overflow-y-scroll max-h-screen no-scrollbar p-3">
        <div className="grid grid-cols-1 my-3">
          <div className="flex justify-center gap-1 rounded-xl bg-[#38393D] items-center p-2">
            <div
              onClick={() => setChange(1)}
              className={`px-7 p-2 rounded-xl ${
                change === 1 ? "bg-[#636366]" : null
              }`}
            >
              Image
            </div>
            <div
              onClick={() => setChange(2)}
              className={`px-7 p-2 rounded-xl ${
                change === 2 ? "bg-[#636366]" : null
              }`}
            >
              Background
            </div>
            <div
              onClick={() => setChange(3)}
              className={`px-7 p-2 rounded-xl ${
                change === 3 ? "bg-[#636366]" : null
              }`}
            >
              Button
            </div>
          </div>

          <div
            className={`grid grid-cols-1 w-full ${
              change == 1 ? null : "hidden"
            }`}
          >
            <div className="my-7">
              <div className="flex justify-center items-center bg-[#333333] rounded-xl">
                <input
                  type="text"
                  className="bg-transparent outline-none  rounded-xl w-full p-2 px-3"
                  placeholder="Search"
                />
                <BsSearch className="text-xl mx-3" />
              </div>
            </div>
            <div className="grid bg-[#38393D] grid-col-1 gap-3 p-4 rounded-xl">
              <div className="font-semibold">Upload Photo</div>
              <input
                type="file"
                name="myFile"
                id="fileInput"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleFileUpload(e)}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="flex flex-col gap-1 border-dashed border-2 rounded-md p-3 justify-center items-center"
              >
                {postImage.myFile ? (
                  <img
                    src={postImage.myFile}
                    alt="gh"
                    className="w-[50px] h-[50px]"
                  />
                ) : (
                  <>
                    <div>
                      <AiOutlineCloudUpload className="text-4xl" />
                    </div>
                    <div className="text-xs mt-1 text-center">
                      Browse and chose the files you want to upload from your
                      computer
                    </div>
                  </>
                )}
                <button
                  onClick={handleSubmit}
                  className="bg-[#0075FF] p-2 px-7 mt-2 rounded-xl"
                >
                  upload
                </button>
              </label>
            </div>
            <div className="grid grid-cols-1 my-4 overflow-y-auto no-scrollbar max-h-[500px]">
              <div>
                <div className="flex mb-2 justify-between items-center">
                  <div>Upload</div>
                  <div className="underline">more</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {image.map((d, f) => (
                    <div key={f}>
                      <div
                        onClick={() => dispatch(imageReducer(d?.myFile))}
                        className="w-full flex justify-center items-center bg-white rounded-xl h-[150px]"
                      >
                        <img
                          src={`${d?.myFile}`}
                          className="max-h-[100px]"
                          alt={`img${f}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-5">
                <div className="flex mb-2 justify-between items-center">
                  <div>Trending</div>
                  <div className="underline">more</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {devpost.map((d, i) => (
                    <div key={i}>
                      <div
                        // onClick={() => {
                        //   if (d?.Imagetype == "Free") {
                        //     dispatch(imageReducer(d?.devPostFile));
                        //   } else {
                        //     dispatch(msg("You dont have MemberShip"));
                        //   }
                        // }}
                        onClick={() => {
                          dispatch(imageReducer(d?.devPostFile));
                        }}
                        className="w-full flex justify-center items-center bg-white rounded-xl h-[150px]"
                      >
                        <img
                          src={`${d?.devPostFile}`}
                          className="max-h-[100px]"
                          alt={`img${i}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* my change = 1 main div */}
          </div>

          <div
            className={`grid grid-cols-1 w-full ${
              change == 2 ? null : "hidden"
            }`}
          >
            <div className="my-7">
              <div className="flex justify-center items-center bg-[#333333] rounded-xl">
                <input
                  type="text"
                  className="bg-transparent outline-none  rounded-xl w-full p-2 px-3"
                  placeholder="Search"
                />
                <BsSearch className="text-xl mx-3" />
              </div>
            </div>

            <div className="overflow-y-scroll no-scrollbar max-h-[550px] py-2">
              <div className="grid grid-cols-2 gap-2">
                {background.map((d, i) => (
                  <div key={i}>
                    <div
                      onClick={() =>
                        dispatch(backgroundReducer(d?.backgroundImage))
                      }
                      className="bg-white flex justify-center items-center w-full h-[150px]"
                    >
                      <img
                        src={`${d?.backgroundImage}`}
                        className="max-h-[100px]"
                        alt={`img${i}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 w-full ${
              change == 3 ? null : "hidden"
            }`}
          >
            <div className="my-7">
              <div className="flex justify-center items-center bg-[#333333] rounded-xl">
                <input
                  type="text"
                  className="bg-transparent outline-none  rounded-xl w-full p-2 px-3"
                  placeholder="Search"
                />
                <BsSearch className="text-xl mx-3" />
              </div>
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold">Link</div>
                <div>
                  <input
                    type="text"
                    placeholder="grovyo.com"
                    className="p-2 px-3 bg-[#333333] w-full outline-none rounded-lg"
                    value={buttonDetails.link}
                    onChange={(e) => {
                      const data = {
                        ...buttonDetails,
                        link: e.target.value,
                      };
                      setButtonDetails(data);
                      dispatch(buttonData(data));
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold">Button Name</div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Button Name Here"
                    className="p-2 px-3 bg-[#333333] w-full outline-none rounded-lg"
                    value={buttonDetails.text}
                    onChange={(e) => {
                      const data = {
                        ...buttonDetails,
                        text: e.target.value,
                      };
                      setButtonDetails(data);
                      dispatch(buttonData(data));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 my-5">
              <div>Buttons</div>
              <div className="overflow-y-scroll no-scrollbar max-h-[335px]">
                <div className="grid grid-cols-2 gap-2">
                  {button.map((d, h) => (
                    <div
                      key={h}
                      onClick={() => {
                        dispatch(
                          buttonReducer({
                            bg: `${d?.backgroundColor}`,
                            color: `${d?.Color}`,
                            pad: `${d?.paddingX}`,
                            boxShadow: `${d?.boxShadow}`,
                            weight: `${d?.fontBold}`,
                            borderRadius: `${d?.borderRadiusTop}`,
                            borderBottom: `${d?.borderBottom}`,
                          })
                        );
                        dispatch(buttonData(buttonDetails));
                      }}
                      className="h-[150px] bg-white flex justify-center items-center rounded-2xl"
                    >
                      <div
                        style={{
                          backgroundColor: `${d?.backgroundColor}`,
                          color: `${d?.Color}`,
                          padding: `${d?.paddingX}`,
                          boxShadow: `${d?.boxShadow}`,
                          fontWeight: `${d?.fontBold}`,
                          borderRadius: `${d?.borderRadiusTop}`,
                          borderBottom: `${d?.borderBottom}`,
                        }}
                      >
                        {d?.text}
                      </div>
                    </div>
                  ))}
                  {/* <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div>
                  <div className="bg-white h-[150px] w-full rounded-xl"></div> */}
                </div>
              </div>
            </div>
          </div>

          {/* important div */}
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default Text;
