"use client";
import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { API } from "@/Essentials";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import {
  useCreateComMutation,
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
} from "@/app/redux/apiroutes/community";

function page() {
  const router = useRouter();
  const [topics, setTopics] = useState(false);
  const [by, setBy] = useState(false);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [topicTitle, setTopicTitle] = useState("");
  const [message, setmessage] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [change, setChange] = useState(1);
  const [leave, setLeave] = useState(false);
  const [topicId, setTopicId] = useState([]);
  const [loading, setLoading] = useState(false);
  const userdata = useSelector((state) => state.userData.actualData);
  const [topicidForEdit, setTopicidForEdit] = useState(null);
  const [createTopicByMutation] = useCreateTopicMutation();
  const [editTopicByMutation] = useUpdateTopicMutation();
  const [createCom] = useCreateComMutation();
  const [deleteTopics] = useDeleteTopicMutation();
  const [dataoftopic, setDataOfTopic] = useState([]);
  const [arrtopic, setArrtopic] = useState({
    name: "",
    msg: "",
    ty: "",
    pri: "",
  });

  const topicskoEditkro = async () => {
    if (type === "Free") {
      setArrtopic({ name: topicTitle, msg: message, ty: "Free", pri: 0 });
    } else {
      setArrtopic({ name: topicTitle, msg: message, ty: "Paid", pri: price });
    }
  };

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        const data = {
          title: arrtopic.name,
          type: arrtopic.ty,
          price: arrtopic.pri,
          message: arrtopic.msg,
        };
        const res = await createTopicByMutation({
          id,
          data,
        });
        // const res = await axios.post(`${API}/createtopic/${id}`, data);
        console.log(res.data);
        setTopicId([...topicId, res.data.topic._id]);
        setDataOfTopic([...dataoftopic, res.data.topic]);
      } catch (err) {
        console.log(err);
      }
      setTopics(false);
      setmessage("");
      setTopicTitle("");
      setType("");
    };

    if (arrtopic.name != "" || arrtopic.msg != "" || arrtopic.ty != "") {
      if (topicidForEdit != null) {
        EditTopicForServer();
      } else {
        sendDataToServer();
      }
    }
  }, [arrtopic]);

  const EditTopicForServer = async () => {
    try {
      const data = {
        title: arrtopic.name,
        type: arrtopic.ty,
        price: arrtopic.pri,
        message: arrtopic.msg,
      };
      const res = await editTopicByMutation({
        id,
        topicid: topicidForEdit,
        data,
      });
      // const res = await axios.post(`${API}/edittopic/${id}/${topicidForEdit}`, data)
      console.log(res.data);

      const updatedataoftopic = dataoftopic.map((d) => {
        return d._id === topicidForEdit ? res.data.updatedTopic : d;
      });
      setDataOfTopic(updatedataoftopic);
      setTopics(false);
      setTopicTitle("");
      setmessage("");
      setTopicidForEdit(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setId(userdata?.id.toString());
  }, [userdata]);

  const handleImageChange = (e) => {
    setSelectImage(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("image", selectedImage);
    formDataToSend.append("title", title);
    formDataToSend.append("category", selectedCategory);
    formDataToSend.append("desc", desc);
    if (Array.isArray(topicId) && topicId.length > 0) {
      topicId.forEach((id, i) => {
        formDataToSend.append(`iddata[${i}]`, id);
      });
    }
    try {
      const response = await createCom({
        id,
        data: formDataToSend,
      });
      if (response.data?.success) {
        toast.success("Community Created!");
        router.push("/main/community");
      }
      to;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // const handletopic = async () => {
  //   setTopics(false);
  // };
  const handle = () => {
    setType("Free");
    setChange(1);
  };
  const handl = () => {
    setType("Paid");
    setChange(2);
  };

  const deleteTopic = async (tId) => {
    try {
      const uiUpdate = dataoftopic.filter((d, i) => {
        return d._id != tId;
      });
      setDataOfTopic(uiUpdate);

      const response = await deleteTopics({
        id,
        topicId: tId,
        data: undefined,
      });
      if (response.data?.success) {
        const a = topicId.filter((d) => d != tId);
        setTopicId(a);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const EditTopic = async (tId, title, msg) => {
    console.log(tId, title, msg);
    setTopics(true);
    setTopicTitle(title);
    setmessage(msg);
    setTopicidForEdit(tId);
  };

  const categories = [
    "Art",
    "Design",
    "Photography",
    "Fashion",
    "Music",
    "Writing",
    "Film and Video",
    "Crafts",
    "Cooking and Food",
    "Gaming",
    "Fitness and Wellness",
    "Beauty",
    "Technology",
    "Travel",
    "Education",
    "Lifestyle",
    "Parenting",
    "Sports",
    "DIY and Home Improvement",
    "Business",
    "Entrepreneurship",
    "Startups",
    "Marketing",
    "Sales",
    "Business Strategy",
    "Finance and Investing",
    "Leadership and Management",
    "Productivity and Time Management",
    "E-commerce",
    "Social Media Marketing",
    "Personal Branding",
    "Business Consulting",
    "Business Development",
    "Human Resources",
    "Negotiation",
    "Communication Skills",
    "Project Management",
    "Business Analytics",
    "Retail",
    "Merchandising",
    "Supply Chain Management",
    "Real Estate",
  ];

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <Toaster />
      {/* popup 1 */}
      <div
        className={`${
          leave
            ? "h-[80vh] sm:h-[90vh] z-10 pn:max-sm:w-full w-[89%] bg-[#cccccc33] flex items-center justify-center absolute duration-100"
            : "h-0 w-0 duration-100 hidden"
        }`}
      >
        <div
          className={`${
            leave
              ? "h-48 w-80 bg-[#F9F9F9] px-2 sm:bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
              : "h-0 w-0 duration-100 text-[0px] hidden"
          }`}
        >
          <div className="font-semibold">Sure you want to Discard?</div>
          <div className="text-[12px]">
            Are you sure you want to Discard this?
          </div>
          <div className="flex gap-4 mt-4">
            <div
              onClick={() => setLeave(false)}
              className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl hover:bg-black hover:text-white"
            >
              No, cancel
            </div>
            <Link
              href="/main/community"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white hover:bg-[#3f3f3f]"
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>
      {/* popup 2 */}
      <div
        className={`${
          by
            ? "h-[80vh] sm:h-[90vh] pn:max-sm:w-full w-[89%] bg-[#cccccc33] z-50 flex items-center justify-center absolute duration-100"
            : "h-0 w-0 duration-100 hidden"
        }`}
      >
        <div
          className={`${
            by
              ? "h-80 p-6 bg-[#fff] ring-1 ring-[#f7f7f7] fixed pn:max-sm:bottom-0 gap-2 flex-wrap w-[100%] sm:w-96 shadow-md sm:bg-white rounded-3xl flex duration-100"
              : "h-0 w-0 duration-100 text-[0px] hidden"
          }`}
        >
          <div className="flex justify-between items-center px-2 w-full">
            <div className="font-semibold ">
              Select your Community Categorie
            </div>
            <RxCross1
              className="font-semibold"
              onClick={() => {
                setBy(false);
              }}
            />
          </div>
          <div className="overflow-auto scrollbar-hide h-60 bg-[#fff]  gap-2 flex-wrap w-[100%]  sm:bg-white  flex duration-100">
            {categories.map((c, i) => (
              <div
                onClick={() => {
                  setSelectedCategory(c);
                  setBy(false);
                }}
                key={i}
                className="p-2 m-1 bg-[#f6f6f6] rounded-xl flex gap-2 hover:bg-[#002EFF] hover:text-[#fff]"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* popup 3 */}
      <div
        className={`${
          topics
            ? "h-[80vh] sm:h-[90vh] pn:max-sm:w-full w-[89%] bg-[#cccccc33] z-50 flex items-center justify-center absolute duration-100"
            : "h-0 w-0 duration-100 hidden"
        }`}
      >
        <div
          className={`${
            topics
              ? "h-[450px] w-96 bg-[#F9F9F9] fixed px-4 pn:max-sm:bottom-0 py-4 sm:bg-white shadow-md rounded-3xl flex flex-col items-center justify-center duration-100"
              : "h-0 w-0 duration-100 text-[0px] hidden"
          }`}
        >
          {/* header */}
          <div className="flex justify-between px-4 font-semibold w-full  ">
            <div>Add a topic</div>
            <RxCross1
              className="font-semibold"
              onClick={() => {
                setTopics(false);
              }}
            />
          </div>
          <div className=" mt-4 h-80 ">
            <div className="mt-2">
              <div>Enter topic name </div>
              <input
                className="bg-slate-200 h-10 rounded-2xl w-full outline-none pl-2"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <div>Welcome message </div>
              <input
                className="bg-slate-200 h-10 rounded-2xl w-full outline-none pl-2"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex justify-between p-0.5 bg-[#f0f0f0] rounded-full items-center">
                <div
                  onClick={handle}
                  className={`${
                    change === 1
                      ? "bg-white px-8 rounded-full py-2"
                      : "bg-transparent px-8 rounded-full py-2"
                  }`}
                >
                  Free
                </div>
                <div
                  onClick={handl}
                  className={`${
                    change === 2
                      ? "bg-white px-8 rounded-full py-2"
                      : "bg-transparent  px-8 rounded-full py-2"
                  }`}
                >
                  Paid
                </div>
              </div>
            </div>
            <div
              className={`${
                change == 2
                  ? "flex bg-slate-50 h-10 rounded-2xl w-full mt-2 items-center "
                  : "hidden"
              }`}
            >
              <input
                className="bg-slate-200 h-10 rounded-2xl w-[70%] pl-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="add price"
              />
              <div className="flex justify-center w-[30%]">monthly </div>
            </div>
            <div className="flex px-4 text-[12px] mt-2  ">
              <BsInfoCircle className="m-0.5 w-5" />
              <span>
                Please be aware that covering paid topics does not enable
                monetization Click to know more.
              </span>
            </div>
          </div>

          <div
            // onClick={handletopic}
            onClick={topicskoEditkro}
            className="w-full rounded-xl py-2 bg-[#002eff] flex justify-center text-white font-semibold"
          >
            {" "}
            Save{" "}
          </div>
        </div>
      </div>

      <div className="overflow-auto overflow-x-hidden scrollbar-hide h-full ">
        <div className=" pt-1 pb-20">
          {/* Header */}

          <div className="flex justify-between p-2 my-2 px-4 items-center ">
            <div className="sm:font-medium sm:pl-4 text-[18px]  text-[#8B8D97]  ">
              Create Community
            </div>
            <div className="flex gap-4 pp:gap-8 items-center">
              <div
                className="font-semibold pn:max-pp:hidden"
                onClick={() => setLeave(true)}
              >
                Discard
              </div>
              <div
                onClick={handleSubmit}
                className=" vs:max-sm:px-10 py-2 px-10 font-semibold bg-[#5570F1] text-white rounded-xl"
              >
                Save
              </div>
            </div>
          </div>

          {/* phone save */}
          <div className="bg-white w-full h-12 rounded-t-2xl shadow-md sm:hidden fixed bottom-0 z-30 flex justify-between items-center px-6">
            {/* <div
              className="px-10 py-2 font-semibold ring-2 ring-[#3e3e3e] rounded-2xl"
              onClick={() => setLeave(true)}
            >
              Discard
            </div> */}
            <div
              onClick={handleSubmit}
              className="px-10 py-2 font-semibold ring-2 cursor-pointer ring-[#002eff] bg-[#002EFF] text-white rounded-2xl"
            >
              Save
            </div>
          </div>
          <div>
            <div className="sm:flex bg-[#FAFAFA] justify-center gap-4 pt-10 ">
              {/* left side */}
              <div className=" w-[100%] flex flex-col sm:items-center">
                <div className="vs:max-sm:px-10 w-[95%] min-w-[250px]">
                  <div className="bg-white p-4 w-full rounded-2xl">
                    <div className="font-semibold pt-4">Community</div>
                    <div className="flex flex-col justify-center gap-4 items-center ">
                      <div className="w-[100px] h-[100px] flex justify-center items-center object-cover overflow-hidden rounded-[34px] mt-2 sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#ebedf3]">
                        {selectImage && (
                          <img
                            src={selectImage}
                            className="w-[100px] h-[100px] rounded-3xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0] container"
                            alt="Selected"
                          />
                        )}
                      </div>
                      <div className=" px-6 rounded-2xl font-semibold">
                        <form>
                          <input
                            id="inputTag"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="inputTag"
                            className="relative z-0 inline-block bg-gradient-to-br text-[#002eff] rounded-md px-2 outline-none whitespace-nowrap select-none cursor-pointer text-sm font-semibold "
                          >
                            {selectImage == "" ? (
                              <div>Set Pic</div>
                            ) : (
                              <div>Change Picture</div>
                            )}
                          </label>
                        </form>
                      </div>
                    </div>
                    <div className="">
                      <div className="font-semibold pt-4">Community Name</div>
                      <input
                        className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                        type="text"
                        placeholder="Community Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="font-semibold pt-4 flex justify-between ">
                      Community Description
                      <p className="font-normal text-[14px]  ">
                        {desc?.length}/ 500
                      </p>
                    </div>
                    <textarea
                      className="outline-none px-3 pt-3 mt-2 bg-[#F4F5F7] w-[100%] scrollbar-hide resize-y rounded-[25px] h-48 "
                      type="text"
                      placeholder="Describe the product in few words"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      maxLength={500}
                    />
                    <div className="">
                      <div className="font-semibold pt-4">Categories</div>
                      <div
                        className={`"outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"`}
                        onClick={() => setBy(!by)}
                      >
                        {selectedCategory}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className=" w-[100%]  max-h-[900px] flex flex-col sm:items-center">
                <div className="vs:max-sm:px-10 p-4 px-7 pb-8 rounded-2xl bg-white w-[95%] min-w-[250px]">
                  <div className="text-xl  font-semibold pb-3">
                    Community Topics
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between my-2 items-center">
                      <div className="">Topics Names</div>
                      <div className="">Actions</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="p-3 border-2 border-[#f1f1f1] rounded-xl">
                        All
                      </div>
                      <div className="p-3 border-2 border-[#f1f1f1] rounded-xl">
                        Post
                      </div>
                      {dataoftopic.map((d, i) => (
                        <div
                          key={i}
                          className="flex justify-between border-2 border-[#f1f1f1] rounded-xl items-center p-3"
                        >
                          <div className="">{d?.title}</div>
                          <div className="flex justify-center gap-2 items-center">
                            <div
                              onClick={() =>
                                EditTopic(d?._id, d?.title, d?.message)
                              }
                              className="cursor-pointer"
                              title="Edit"
                            >
                              <MdEdit size={20} />
                            </div>
                            <div
                              onClick={() => {
                                deleteTopic(d?._id);
                              }}
                              title="Delete"
                              className="cursor-pointer"
                            >
                              <RiDeleteBin6Line size={20} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => setTopics(true)}
                      className="flex justify-center gap-2 items-center bg-[#E8F1FF] text-[#5570F1] p-2 px-5 rounded-xl"
                    >
                      <div>
                        <FaPlus />
                      </div>
                      <div>Add Topic</div>
                    </button>
                  </div>
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
