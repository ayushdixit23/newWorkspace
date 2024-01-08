"use client";
import { API } from "@/Essentials";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { decryptaes, encryptaes } from "@/app/utils/security";

import { useSelector } from "react-redux";
import aesjs from "aes-js";
import { FaPlus } from "react-icons/fa";
import { useAddProductMutation } from "@/app/redux/apiroutes/product";
function page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectImage, setSelectImage] = useState([]);
  const [desc, setDesc] = useState("");
  const [quantity, setQuanity] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState("----setect type of product----");
  const [drop, setDrop] = useState(true);
  const [call, setCall] = useState(true);
  const [by, setBy] = useState(false);
  const [discount, setDiscount] = useState("");
  const [finalimages, setFinalimages] = useState([]);
  const [AddProduct] = useAddProductMutation();
  const id = useSelector((state) => state.userData.actualData?.id.toString());
  const collecid = useSelector((state) => state.userData.collectionId);

  if (collecid) {
    Cookies.set("clvss", encryptaes(collecid));
  }
  const hoja = Cookies.get("clvss");
  const cid = hoja ? decryptaes(hoja) : null;
  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    const combinedImages = [...selectedImage, ...newImages];
    // Limit the number of images to 4
    const limitedImages = combinedImages.slice(0, 4);
    const newImageNames = newImages.map((image) => image.name);
    const newImagesfinal = newImages.map((image) => image);
    newImagesfinal.forEach((image) => {
      setFinalimages((p) => [...p, image]);
    });
    console.log(id, "id");
    console.log(cid, "cid");
    setSelectImage((prev) => [...prev, ...newImageNames]);
    setSelectedImage(limitedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    finalimages.forEach((image) => {
      formDataToSend.append("image", image);
    });
    formDataToSend.append("name", name);
    formDataToSend.append("quantity", quantity);
    formDataToSend.append("desc", desc);
    formDataToSend.append("price", price);
    formDataToSend.append("brandname", "price");
    formDataToSend.append("shippingcost", 24);
    formDataToSend.append("sellername", "price");
    formDataToSend.append("discountedprice", discount);

    try {
      const result = await AddProduct({
        id: id,
        collecid: cid ? cid : collecid,
        data: formDataToSend,
      });
      if (result.data?.success) {
        clearCookies();
        router.push("/main/store");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearCookies = () => {
    Cookies.remove("clvss");
  };

  useEffect(() => {
    const handlePopstate = () => {
      clearCookies();
      window.location.href = "/main/store";
    };
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = handlePopstate;
    return () => {
      window.onpopstate = null;
    };
  }, []);

  const handleClick = useCallback(() => {
    setChange("Physical Product");
    setDrop(true);
    setCall(!call);
  }, []);
  const handle = useCallback(() => {
    setChange("Digital product or service");
    setDrop(true);
    setCall(true);
  }, []);

  return (
    <div className=" pt-1 pb-20">
      {/**popUp */}
      <div
        className={`${
          by
            ? "h-[90vh] w-[85%] rounded-2xl flex items-center justify-center absolute duration-100"
            : "h-0 w-0 duration-100 hidden"
        }`}
      >
        <div
          className={`${
            by
              ? "h-48 w-80 bg-[#F9F9F9] vs:max-sm:ml-10 shadow-2xl sm:bg-white sm:shadow-[0_3px_12px_1px_rgba(0,0,0,0.5)] rounded-3xl flex flex-col items-center justify-center duration-100"
              : "h-0 w-0 duration-100 text-[0px] hidden"
          }`}
        >
          <div className="font-semibold">Sure you want to Discard?</div>
          <div className="text-[12px]">
            Are you sure you want to Discard this?
          </div>
          <div className="flex gap-4 mt-4">
            <div
              onClick={() => setBy(false)}
              className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl hover:bg-black hover:text-white"
            >
              No, cancel
            </div>
            <Link
              href="/main/store"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white hover:bg-[#3f3f3f]"
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>

      {/**head*/}
      <div className="flex justify-between p-2 my-2 px-4 items-center ">
        <div className="sm:font-medium sm:pl-4 text-[18px]  text-[#8B8D97]  ">
          Add product
        </div>
        <div className="flex gap-4 pp:gap-8 items-center">
          <div
            className="font-semibold pn:max-pp:hidden"
            onClick={() => setBy(true)}
          >
            Discard
          </div>
          <div
            onClick={(e) => handleSubmit(e)}
            className=" vs:max-sm:px-10 py-2 px-10 font-semibold bg-[#5570F1] text-white rounded-xl"
          >
            Save
          </div>
        </div>
      </div>

      {/**main */}
      <div className="bg-[#f9f9f9] w-full h-full sm:py-7">
        <div className="sm:grid sm:grid-cols-2 w-full sm:justify-center gap-4 pt-1">
          <div className="w-[100%] flex flex-col sm:px-5 sm:items-center">
            <div className="pn:max-pp:px-2 w-full pp:max-sm:px-10 min-w-[250px]">
              <div className="bg-white p-4 w-full rounded-2xl">
                <div className="font-semibold text-[20px] pt-1">
                  General Information
                </div>
                <div>
                  <div className="font-semibold pt-4">Product name</div>
                  <input
                    className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="text-[#828282] text-[12px] pt-2 ">
                    Give Your Product a short and clear name.
                  </div>
                </div>
                <div>
                  <div className="font-semibold pt-4 flex justify-between ">
                    Description
                    <p className="font-normal text-[14px] -pl-2 ">
                      {desc.length}/ 500
                    </p>
                  </div>
                  <textarea
                    className="outline-none px-3 pt-3 mt-2 bg-[#F4F5F7] scrollbar-hide resize-y rounded-2xl w-[100%] h-48 "
                    type="text"
                    placeholder="Describe the product in few words"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    maxLength={500}
                  />
                  <div className="text-[#828282] text-[12px]  ">
                    Give Your Product a short and clear description.
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 w-full rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Media</div>

                <div className=" rounded-[25px] border-dotted border-2 w-[100%] mt-2 px-2 ">
                  <div className="flex space-x-3 h-20 px-9">
                    <>
                      {" "}
                      {selectedImage.map((i, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(i)}
                          className="h-20 w-20 pt-2 rounded-xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]"
                          alt={`Selected ${index}`}
                        />
                      ))}
                    </>
                  </div>
                  <div className=" py-3">
                    <div className="h-20 bg-gray-200 mt-2 rounded-[20px]">
                      <div className="sm:pl-[10%] pt-3 flex justify-center items-center">
                        <form>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className=" w-[105px]"
                          />
                        </form>
                      </div>
                      <div className="flex text-[10px] justify-center items-center pt-1">
                        you can add upto
                        <div className="slm:max-sm:hidden px-1">4</div>to
                        <div className="sm:hidden px-1">3</div> images
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[#828282] text-[12px] pt-2 ">
                  Used to represent your product during checkout , in Community
                  ,social sharing and more.
                </div>
              </div>
            </div>
          </div>
          {/* left */}
          <div className="w-[100%]  flex flex-col sm:items-center">
            <div className="pn:max-pp:px-2 pp:max-sm:px-10 sm:w-[90%] min-w-[250px]">
              <div className="bg-white p-4 rounded-2xl ">
                <div className="font-semibold text-[20px] pt-1">Price</div>
                <div className="flex pn:max-pp:flex-col">
                  <div>
                    <div className="font-semibold pt-4">Selling Price</div>
                    <div className="outline-none ring-1 ring-[#f5f5f5] justify-center mt-2 bg-[#ffffff] items-center rounded-[12px] h-10 w-[90%] flex ">
                      <div className="p-3">₹</div>
                      <input
                        className="outline-none flex pl-3 justify-center bg-[#F4F5F7] items-center rounded-r-[12px] h-10 w-[90%]"
                        type="number"
                        placeholder="price..."
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold pt-4">Discounted Price</div>
                    <div className="outline-none ring-1 ring-[#f5f5f5] justify-center mt-2 bg-[#ffffff] items-center rounded-[12px] h-10 w-[90%] flex ">
                      <div className="p-3">₹</div>
                      <input
                        className="outline-none flex pl-3 justify-center bg-[#F4F5F7] items-center rounded-r-[12px] h-10 w-[90%]"
                        type="number"
                        placeholder="Discounted price..."
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white pt-3 rounded-2xl mt-2">
                  <div className="flex items-center">
                    <input
                      className="p-1 m-1"
                      onClick={() => {
                        setCall(!call);
                      }}
                      type="checkbox"
                    />
                    <div className="text-[#5570F1]">
                      This product includes gst
                    </div>
                  </div>

                  <div
                    className={`${
                      call
                        ? "hidden"
                        : "outline-none flex justify-center mt-2 bg-[#ffffff] items-center rounded-[12px] h-10 w-[40%] ring-1 ring-[#f5f5f5]"
                    }`}
                  >
                    <select
                      className={`${
                        call
                          ? "hidden"
                          : "outline-none flex px-2 justify-center bg-[#ffffff] items-center rounded-r-[12px] h-10"
                      }`}
                    >
                      <option>0</option>
                      <option>12%</option>
                      <option></option>
                      <option>pounds</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Inventory</div>
                <div className="font-semibold pt-4">Quantity</div>
                <input
                  className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                  type="number"
                  placeholder="Quantity in Stock"
                  value={quantity}
                  onChange={(e) => setQuanity(e.target.value)}
                />
              </div>
              {/* <div className="bg-white p-4 rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Variation</div>
                <div className="flex pn:max-pp:flex-col gap-3">
                  <div>
                    <div className="font-semibold pt-4">Variation Type</div>
                    <input
                      className="outline-none flex w-full p-2 justify-center bg-[#F4F5F7] items-center rounded-xl "
                      type="number"
                      placeholder="price..."
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="font-semibold pt-4">Variation</div>
                    <input
                      className="outline-none flex p-2 justify-center bg-[#F4F5F7] items-center rounded-xl w-full"
                      type="number"
                      placeholder="Discounted price..."
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />

                  </div>

                </div>
                <div className="mt-3">
                  <button className="flex justify-center items-center bg-[#E8F1FF] text-[#5570F1] p-2 px-5 rounded-xl">
                    <div><FaPlus />
                    </div>
                    <div>Add Variant</div>
                  </button>
                </div>
              </div> */}
              <div className="bg-white p-4 rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Shiping</div>
                <div className="flex pt-4 items-center">
                  <input
                    className="p-1 m-1"
                    onClick={() => {
                      setCall(!call);
                    }}
                    type="checkbox"
                  />
                  <div className="text-[#5570F1]">
                    This is a physical product
                  </div>
                </div>
                <div
                  className={`${
                    call
                      ? "hidden"
                      : "outline-none flex justify-center mt-2 bg-[#ffffff] items-center rounded-[12px] h-10 w-[40%] ring-1 ring-[#f5f5f5]"
                  }`}
                >
                  <input
                    className={`${
                      call
                        ? "hidden"
                        : "outline-none flex pl-3 justify-center bg-[#F4F5F7] items-center rounded-l-[12px] h-10 w-[60%]"
                    }`}
                    type="text"
                    placeholder="0.0"
                  />
                  <select
                    className={`${
                      call
                        ? "hidden"
                        : "outline-none flex px-2 justify-center bg-[#ffffff] items-center rounded-r-[12px] h-10"
                    }`}
                  >
                    <option>kg</option>
                    <option>mg</option>
                    <option>lit</option>
                    <option>pounds</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
{
  /*            <div>
                  <div className={`font-semibold mt-4`}>Product type</div>
                  <div className="pt-2">
                    <div
                      className={`outline-none flex pl-3 items-center bg-[#F4F5F7] h-10 w-[100%] ${
                        drop ? "rounded-[12px]" : "rounded-t-[12px]"
                      }`}
                      onClick={() => setDrop(!drop)}
                    >
                      {change}
                    </div>
                    <div
                      className={`bg-[#F4F5F7] rounded-b-2xl w-[100%] ${
                        drop ? "h-0 text-[0px] duration-75" : " duration-75"
                      }`}
                    >
                      <div
                        className="flex items-center pl-3 h-10 "
                        onClick={handleClick}
                      >
                        Physical Product
                      </div>
                      <div
                        className=" flex items-center pl-3 h-10 "
                        onClick={handle}
                      >
                        Digital product or service
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <input
                        className={`${
                          call
                            ? "hidden"
                            : "outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[40%]"
                        }`}
                        type="text"
                        placeholder="0.0"
                      />
                      <select
                        className={`${
                          call
                            ? "hidden"
                            : "outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10"
                        }`}
                      >
                        <option>kg</option>
                        <option>mg</option>
                        <option>18%</option>
                        <option>28%</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-[#828282] text-[12px] pt-2 ">
                    select type of product
                  </div>
                </div> */
}
