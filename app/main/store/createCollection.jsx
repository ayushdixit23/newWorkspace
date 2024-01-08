import React from "react";
import hehe from "../../assets/image/hehe.png";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useCreateCollectionMutation } from "@/app/redux/apiroutes/product";

const CreateCollection = ({ col, setCol, image, setCheck, setImage, id }) => {
  const [createCollectionMutation] = useCreateCollectionMutation();
  const handleFileChangeCol = (e) => {
    const selectedFile = e.target.files[0];
    const sendFile = URL.createObjectURL(selectedFile);
    setCol({ ...col, d3: selectedFile });
    setImage(sendFile);
  };
  const list = [
    { name: "Retail" },
    { name: "Fashion and Apparel" },
    { name: "Electronics" },
    { name: "Home And Furniture" },
    { name: "Beauty and Personal Care" },
    { name: "Health and Wellness" },
    { name: "Food and Grocery" },
    { name: "Books and Media" },
    { name: "Toys and Games" },
    { name: "Jewellery and Accessories" },
    { name: "Art and Crafts" },
    { name: "Sports and Outdoors" },
    { name: "Electronics Accessories" },
    { name: "Handmade and Artisanal Products" },
  ];

  const sendCol = async (e) => {
    e.preventDefault();

    const formDataCol = new FormData();
    formDataCol.append("name", col.d1);
    formDataCol.append("category", col.d2);
    formDataCol.append("verfication", col.d3);
    try {
      formDataCol.forEach((d) => {
        console.log(d);
      });
      const result = await createCollectionMutation({
        id: id,
        data: formDataCol,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        className={` fixed inset-0 bg-black bg-opacity-50 backdrop-filter h-screen backdrop-blur-md z-10 `}
      >
        <div className="flex justify-center pn:max-vs:text-sm items-center h-screen pn:max-pp:p-2">
          <div className="flex max-w-[450px] max-h-[700px] p-3 gap-2 pp:p-5 rounded-lg bg-white flex-col">
            <div>
              <Image src={hehe} alt="hehe" />
            </div>
            <div className="font-semibold">Collection</div>
            <div className="text-sm">
              This blog post has been published. Team members will be able to
              edit this post and republish changes.
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="w-full flex gap-1 flex-col">
                <div className="text-sm font-medium">Collection name</div>
                <input
                  className="border-2 p-1 rounded-xl bg-[#FAFAFA] outline-none"
                  value={col.d1}
                  onChange={(e) => setCol({ ...col, d1: e.target.value })}
                />
              </div>
              <div className="w-full gap-3 flex flex-col">
                <div className="text-sm font-medium">Collection Category</div>
                <select
                  value={col.d2}
                  onChange={(e) => setCol({ ...col, d2: e.target.value })}
                  className="border-2 p-1 rounded-xl "
                >
                  {list.map((d, i) => (
                    <option key={i} value={d.name} className="">
                      {d.name}
                    </option>
                  ))}
                </select>
                <div>
                  {col.d2 === "Food and Grocery" && (
                    <>
                      <div>
                        <label htmlFor="fileInput">
                          <div>Upload Document for Verification</div>
                          {col.d3 ? (
                            <div className="flex justify-center items-center">
                              <img
                                src={`${image}`}
                                alt="image"
                                className="max-w-[100px]"
                              />
                            </div>
                          ) : (
                            <div className="border-2 p-6 border-dashed rounded-xl flex justify-center items-center">
                              <FaPlus />
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          className="hidden"
                          onChange={(e) => handleFileChangeCol(e)}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-center items-center w-full gap-3">
                  <button
                    className="bg-white border-2 text-black p-2 w-full rounded-xl"
                    onClick={() => setCheck(0)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#1554F6] text-white p-2 w-full rounded-xl"
                    onClick={(e) => sendCol(e)}
                  >
                    Create Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCollection;
