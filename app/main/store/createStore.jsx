import { useCreateStoreMutation } from "@/app/redux/apiroutes/product";
import React from "react";
import { FaPlus } from "react-icons/fa";

const CreateStore = ({
  store,
  setStore,
  setCheck,
  setShowImage,
  showImage,
  refetch,
  id,
}) => {
  const [createStore] = useCreateStoreMutation();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("runnded");
    const sendFile = URL.createObjectURL(selectedFile);
    setStore({ ...store, d9: selectedFile });
    setShowImage(sendFile);
  };

  const send = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("buildingno", store.d1);
      formDataToSend.append("city", store.d2);
      formDataToSend.append("state", store.d3);
      formDataToSend.append("postal", store.d4);
      formDataToSend.append("landmark", store.d5);
      formDataToSend.append("gst", store.d6);
      formDataToSend.append("businesscategory", store.d7);
      formDataToSend.append("documenttype", store.d8);
      formDataToSend.append("documentfile", store.d9);
      const result = await createStore({
        id: id,
        data: formDataToSend,
      });
      console.log(result);
      if (result.data?.success) {
        await refetch();
        setCheck(0);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-filter h-screen backdrop-blur-md z-10`}
      >
        <div className="flex justify-center pn:max-vs:text-sm items-center h-screen pn:max-pp:p-2">
          <div className="bg-white overflow-y-scroll no-scrollbar max-h-[700px] p-3 pp:p-5 rounded-lg md:min-w-[500px] w-[95%] pp:max-w-[900px]">
            <div className="flex flex-col mb-3">
              <div className="text-lg font-semibold">
                Continue to Setup Your Store
              </div>
              <div>Enter The Remaining Details </div>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                <div className="text-sm font-medium">Address</div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                  value={store.d1}
                  onChange={(e) => setStore({ ...store, d1: e.target.value })}
                />
              </div>
              <div className="grid pp:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm font-medium">City</div>
                  <input
                    type="text"
                    className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                    value={store.d2}
                    onChange={(e) => setStore({ ...store, d2: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm font-medium">State</div>
                  <input
                    type="text"
                    className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                    value={store.d3}
                    onChange={(e) => setStore({ ...store, d3: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid pp:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm font-medium">Postal Code</div>
                  <input
                    type="text"
                    className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                    value={store.d4}
                    onChange={(e) => setStore({ ...store, d4: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm font-medium">Famous Landmark</div>
                  <input
                    type="text"
                    className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                    value={store.d5}
                    onChange={(e) => setStore({ ...store, d5: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="text-sm font-medium">GST Number (Optional)</div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                  value={store.d6}
                  onChange={(e) => setStore({ ...store, d6: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="text-sm font-medium">Business Category</div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                  value={store.d7}
                  onChange={(e) => setStore({ ...store, d7: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="text-sm font-medium">
                  Enter PAN or Aadhaar Number
                </div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] outline-none p-1 rounded-lg"
                  value={store.d8}
                  onChange={(e) => setStore({ ...store, d8: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="fileInputagain">
                  <div>Upload Document for Verification</div>
                  {store.d9 != "" ? (
                    <div className=" flex justify-center items-center">
                      <img
                        src={`${showImage}`}
                        alt="image"
                        className="max-w-[150px]"
                      />
                    </div>
                  ) : (
                    <div className="border-2 pn:max-pp:p-16 p-6 border-dashed rounded-xl flex justify-center items-center">
                      <FaPlus />
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="fileInputagain"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 mt-2 p-2 w-full">
              <button
                onClick={() => setCheck(0)}
                className="w-full rounded-lg p-2 text-black border-2"
              >
                Cancel
              </button>
              <button
                className="w-full p-2 bg rounded-lg bg-[#5570F1] text-white"
                onClick={(e) => send(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateStore;
