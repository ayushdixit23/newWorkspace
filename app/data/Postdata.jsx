import NoPost from "@/app/components/NoPost";
import { formatISOStringToDMY } from "@/app/utils/Useful";
import React from "react";

const Postdata = ({ analyticsdata, state }) => {
  return (
    <>
      {/* mobile */}
      <div className="bg-white my-3 rounded-xl sm:hidden">
        <div className="p-3 px-4">Recent Posts</div>
        {!analyticsdata?.postmerged ||
          analyticsdata?.postmerged.length === 0 ||
          analyticsdata?.postmerged.filter(
            (d) => d?.community?.title === state.name
          ).length === 0 ? (
          <NoPost />
        ) : (
          <div>
            {analyticsdata?.postmerged
              ?.filter((w) => w?.community?.title === state.name)
              ?.map((d, i) => (
                <div
                  key={i}
                  className="border p-2 flex flex-col justify-center items-center gap-2 w-full"
                >
                  <div className="flex justify-between w-full items-center">
                    <div className="flex justify-center items-center gap-2">
                      <div>
                        <img
                          src={d?.dps}
                          className="min-w-[40px] min-h-40px] max-w-[45px] max-h-45px]"
                          alt="image"
                        />
                      </div>
                      <div className="text-sm font-medium">{d?.title}</div>
                    </div>
                    <div className="text-[#667085] text-sm">
                      {formatISOStringToDMY(d?.createdAt)}
                    </div>
                  </div>
                  <div className="flex justify-evenly w-full items-center">
                    <div className="flex text-sm flex-col justify-center items-center">
                      <div>{d?.likes}</div>
                      <div className="pn:max-pp:text-sm">Applauses</div>
                    </div>
                    <div className="flex text-sm flex-col justify-center items-center">
                      <div>{d?.comments?.length}</div>
                      <div className="pn:max-pp:text-sm">Comments</div>
                    </div>
                    <div className="flex text-sm flex-col justify-center items-center">
                      <div>{d?.sharescount}</div>
                      <div className="pn:max-pp:text-sm">Shares</div>
                    </div>
                    <div>
                      <div>+5</div>
                      <div className="hidden">-5</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* <NoPost /> */}
      {/* {analyticsdata?.postmerged?.length == 0 ? (
        <NoPost />
      ) : (
        <>
          {analyticsdata?.postmerged.filter(
            (d) => d?.community?.title === state.name
          ).length === 0 ? (
            <NoPost />
          ) : (
            <div className="max-h-[300px] overflow-y-scroll no-scrollbar bg-white rounded-xl sm:p-2  w-full">
              <table className="w-full pn:max-sm:hidden sm:max-lg:min-w-[750px] rounded-xl border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      colSpan="2"
                      className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider"
                    >
                      Posts
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Date Uploaded
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider ">
                      Applauses
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Comments
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Shares
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Engagement Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="gap-10">
                  {analyticsdata?.postmerged
                    .filter((d) => d?.community?.title === state.name)
                    .map((d, i) => (
                      <tr key={i}>
                        <td
                          colSpan="2"
                          className="text-left text-sm py-2 leading-5 font-medium text-gray-900 col-span-3"
                        >
                          <div className="flex gap-2 items-center">
                            <div>
                              <img
                                src={d?.dps}
                                className="min-w-[30px] min-h-[30px] max-w-[35px] rounded-lg max-h-[35px]"
                                alt="image"
                              />
                            </div>
                            <div className="flex flex-col text-xs font-medium gap-1">
                              {d?.title}
                            </div>
                          </div>
                        </td>
                        <td className="text-xs leading-5 py-2 px-3 text-center">
                          {formatISOStringToDMY(d?.createdAt)}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          {d?.likes}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          {d?.comments?.length}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          {d?.sharescount}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          +5
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )} */}

      {/* web */}
      <div className="pn:max-sm:hidden">
        {!analyticsdata?.postmerged ||
          analyticsdata?.postmerged.length === 0 ||
          analyticsdata?.postmerged.filter(
            (d) => d?.community?.title === state.name
          ).length === 0 ? (
          <NoPost />
        ) : (
          <div className="max-h-[300px] overflow-y-scroll no-scrollbar bg-white rounded-xl sm:p-2  w-full">
            <table className="w-full  sm:max-lg:min-w-[750px] rounded-xl border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    colSpan="2"
                    className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider"
                  >
                    Posts
                  </th>
                  <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                    Date Uploaded
                  </th>
                  <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                    Applauses
                  </th>
                  <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                    Engagement Rate
                  </th>
                </tr>
              </thead>
              <tbody className="gap-10">
                {analyticsdata?.postmerged
                  .filter((s) => s?.community?.title === state.name)
                  .map((d, i) => (
                    <tr key={i}>
                      <td
                        colSpan="2"
                        className="text-left text-sm py-2 leading-5 font-medium text-gray-900 col-span-3"
                      >
                        <div className="flex gap-2 items-center">
                          <div>
                            <img
                              src={d?.dps}
                              className="min-w-[30px] min-h-[30px] max-w-[35px] rounded-lg max-h-[35px]"
                              alt="image"
                            />
                          </div>
                          <div className="flex flex-col text-xs font-medium gap-1">
                            {d?.title}
                          </div>
                        </div>
                      </td>
                      <td className="text-xs leading-5 py-2 px-3 text-center">
                        {formatISOStringToDMY(d?.createdAt)}
                      </td>
                      <td className="text-sm leading-5 py-2 px-3 text-center">
                        {d?.likes}
                      </td>
                      <td className="text-sm leading-5 py-2 px-3 text-center">
                        {d?.comments?.length}
                      </td>
                      <td className="text-sm leading-5 py-2 px-3 text-center">
                        {d?.sharescount}
                      </td>
                      <td className="text-sm leading-5 py-2 px-3 text-center">
                        {Math.round(parseInt(d?.engrate))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Postdata;
