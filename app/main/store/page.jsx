"use client";
import React, { useEffect, useState } from "react";
import Productinformation from "./productinformation";
import Link from "next/link";
import Image from "next/image";
import p1 from "../../assets/image/Icon.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { collection } from "@/app/redux/slice/userData";
import CreateStore from "./createStore";
import CreateCollection from "./createCollection";
import Loader from "@/app/data/Loader";
import {
  useCheckStoreExistsQuery,
  useDeleteProductMutation,
  useGetProductQuery,
  useRemoveCollectionMutation,
} from "@/app/redux/apiroutes/product";

function page() {
  const [data, setData] = useState([]);
  const userdata = useSelector((state) => state.userData.actualData);
  const [id, setId] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(null);
  const [col, setCol] = useState({
    d1: "",
    d2: "Retail",
    d3: null,
  });
  const [productdeletemutate] = useDeleteProductMutation();
  const { data: productdata, isLoading } = useGetProductQuery(
    { id: userdata?.id.toString() },
    { skip: !userdata?.id.toString(), refetchOnMountOrArgChange: true }
  );
  const { data: checkstore, refetch } = useCheckStoreExistsQuery(
    { id },
    {
      skip: !id,
    }
  );

  const [deleteMutation] = useRemoveCollectionMutation();
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setId(userdata?.id.toString());
  }, [userdata]);

  const remove = async (e, colid) => {
    e.preventDefault();

    try {
      console.log(id, colid);
      const result = await deleteMutation({
        id: userdata?.id.toString(),
        colid: colid,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  const [store, setStore] = useState({
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
    d7: "",
    d8: "",
    d9: "",
  });

  const handleDelete = async (userid, pid, collecid, index) => {
    const updatedData = data.map((d) => {
      if (d._id === collecid) {
        const updatedProducts = d.products.filter(
          (product) => product._id !== pid
        );
        return { ...d, products: updatedProducts };
      }
      return d;
    });
    setData(updatedData);
    const result = await productdeletemutate({
      id: userid,
      collecid: collecid,
      pid: pid,
    });
    console.log(result);
  };

  const createCheck = () => {
    if (checkstore?.exist) {
      setCheck(1);
    } else {
      setCheck(2);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {/* <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
            <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] p-3 rounded-xl h-[250px] bg-white">
              <div className="flex flex-col flex-grow gap-3 justify-center items-center w-full">
                <div className="text-2xl font-semibold">Are You Sure?</div>
                <div className="text-center text-[#667085]">
                  Do you really want to Delete this Product? This process cannot
                  be undone.
                </div>
                <div className="flex justify-center w-full gap-3 items-center">
                  <button className="w-full border-2 p-2 px-5 rounded-xl">
                    Cancel
                  </button>
                  <button className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div> */}
      {/* collection create krne ka pop up starts */}
      {check == 1 && (
        <CreateCollection
          setCheck={setCheck}
          col={col}
          id={userdata?.id.toString()}
          setImage={setImage}
          image={image}
          sendCol={sendCol}
          setCol={setCol}
        />
      )}

      {/* collection create krne ka pop up ends */}
      {/* create store starts */}
      {check == 2 && (
        <CreateStore
          store={store}
          id={userdata?.id.toString()}
          setCheck={setCheck}
          setStore={setStore}
          refetch={refetch}
          setShowImage={setShowImage}
          showImage={showImage}
        />
      )}
      {/* create store ends */}
      <div>
        <div className="overflow-auto scrollbar-hide h-full ">
          <div className="flex justify-between py-2 my-2 px-4 items-center">
            <div className="sm:font-medium sm:pl-4 text-[18px] text-[#8B8D97]  ">
              Product
            </div>
            <div
              onClick={createCheck}
              className="py-2 vs:max-sm:hidden px-5 border-2 shadow-sm font-medium text-black rounded-xl"
            >
              Create Collection
            </div>
          </div>

          <div className=" bg-[#FAFAFA] p-3 w-full  grid grid-cols-1">
            <div className="pt-4 rounded-2xl grid grid-cols-1 w-full">
              {/* web */}
              <div className="flex pn:max-sm:hidden justify-center bg-[#FAFAFA] p-3 w-full items-center gap-2 md:gap-5">
                <div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white rounded-xl gap-4 border-2 w-full">
                  <div>
                    <Image src={p3} alt="p1" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Earings</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">0</div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
                <div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white rounded-xl gap-4 border-2 w-full">
                  <div>
                    <Image src={p1} alt="p2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Customers</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">0</div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-3 sm:max-md:text-xs py-5 bg-white rounded-xl gap-4 border-2 w-full">
                  <div>
                    <Image src={p2} alt="p2" />
                  </div>
                  <div className="flex justify-between items-center ">
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">All Orders</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">0</div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Pending</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">0</div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Completed</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">0</div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* mobile */}
              <div className="grid grid-cols-2 sm:hidden bg-[#FAFAFA] p-3 w-full items-center gap-2 md:gap-7">
                <div className="flex flex-col bg-white p-3 rounded-xl gap-2 border-2 w-full">
                  <div>
                    <Image src={p3} alt="p1" />
                  </div>
                  <div>
                    <div className="font-medium">Earings</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">0</div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-white p-3 rounded-xl gap-2 border-2 w-full">
                  <div>
                    <Image src={p1} alt="p2" />
                  </div>
                  <div>
                    <div className="font-medium">Customers</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">0</div>
                      <div className="text-green-700">+0.00%</div>
                    </div>
                  </div>
                </div>
                <div className="flex col-span-2 bg-white flex-col p-3 rounded-xl gap-3 border-2 w-full">
                  <div>
                    <Image src={p2} alt="p2" />
                  </div>
                  <div className="flex justify-between items-center ">
                    <div>
                      <div className="font-medium">All Orders</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">0</div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Pending</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">0</div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Completed</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">0</div>
                        <div className="text-green-700">+0.00%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAFA] p-3">
                <div className="flex w-full bg-white py-4 vs:max-sm:hidden px-1 rounded-xl justify-between">
                  <div className="w-64 sm:max-md:w-52 font-medium flex justify-start pl-4 ">
                    Product
                  </div>
                  <div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
                    Quantity
                  </div>
                  <div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
                    Price
                  </div>
                  <div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
                    Status
                  </div>
                  <div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
                    Added
                  </div>
                  <div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
                    Actions
                  </div>
                </div>
              </div>

              <div className="px-3 flex flex-col gap-5 py-3 bg-[#FAFAFA]">
                {productdata?.collections.map((d, i) => (
                  <div key={i} className="bg-white py-2 rounded-xl">
                    <div className="flex justify-between py-2 px-3 items-center">
                      <div className="font-medium text-[#4A4C56]">{d.name}</div>
                      <div
                        className="flex cursor-pointer
                     justify-center
                     items-center gap-2"
                      >
                        <div
                          onClick={() => {
                            router.push("/main/store/addproduct");
                            dispatch(collection(d._id));
                          }}
                          className="bg-[#5570F1] text-white p-2 px-6 font-semibold rounded-xl"
                        >
                          Add Product
                        </div>
                      </div>
                    </div>
                    <div className="mt-1">
                      {d.products?.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {d.products.map((f, g) => (
                            <Productinformation
                              key={g}
                              index={g}
                              handleDelete={handleDelete}
                              data={f}
                              collectionid={d._id}
                              userid={f.creator}
                            />
                          ))}
                        </div>
                      ) : (
                        <div>No products in this collection.</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/main/store/addproduct"
                className="animate-bounce sm:hidden h-12 w-12  bg-blue-700 rounded-full flex justify-center items-center fixed right-5 sm:right-10 bottom-20 cursor-pointer"
              >
                <div className="text-white text-[30px] font-semibold">+</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // else {
  //   return (
  //     <div>
  //       <div className="overflow-auto pt-2 scrollbar-hide flex flex-col items-center justify-center h-[80vh] sm:mx-5 ">
  //         <Image src={Empty} className="h-96 w-96" alt="create community" />
  //         <div className="font-semibold text-[18px] mt-6">
  //           No products - yet!
  //         </div>
  //         <div className="flex items-center flex-col justify-center">
  //           <div>
  //             Look like you haven’t added a product, no worries. click the
  //           </div>
  //           <div>“add new product button“</div>
  //         </div>

  //         <Link
  //           href="/main/store/addproduct"
  //           className="py-2 px-6 bg-blue-600 text-white rounded-2xl mt-6"
  //         >
  //           Add new product
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  // else {
  //   return (
  //     <div>
  //       <div className="overflow-auto pt-1 scrollbar-hide h-full ">
  //         <div className="flex justify-between items-center">
  //           <div className="sm:font-medium sm:pl-4 text-[18px] animate-pulse px-10 py-4 bg-[#f2f2f2] rounded-2xl text-[#8B8D97]"></div>
  //           <Link
  //             href="/main/store/addproduct"
  //             className="vs:max-sm:hidden  animate-pulse px-10 py-4  bg-[#f2f2f2] text-white rounded-2xl"
  //           ></Link>
  //         </div>

  //         <div className=" sm:grid-cols-4 w-full grid-cols-2 grid gap-2 pt-8 sm:pl-[4%] vs:max-sm:px-[2%] ">
  //           <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
  //           <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
  //           <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
  //           <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
  //         </div>

  //         <div className="pt-4">
  //           <div className="flex w-full vs:max-sm:hidden sm:pt-4 px-4 justify-between">
  //             <div className="w-64 sm:max-md:w-52 bg-[#f2f2f2]  animate-pulse font-medium flex justify-start "></div>
  //             <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
  //             <div className="w-36  sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
  //             <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
  //             <div className="w-36 sm:max-md:w-24 flex justify-center font-medium "></div>
  //           </div>
  //           <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
  //           <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
  //           <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
  //           <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default page;
