import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";


export default function Admin() {
  const [allData, setAllData] = useState(null);

  const [status1, setStatus] = useState("");
  const [statusChange, setStatusChange] = useState(null);
  const [category,setCategory] = useState("");


  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const router = useRouter();

  console.log(status1);
  //check user logged in

  useEffect(() => {
    const handleClick = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const { status } = response;
      } catch (error) {
        window.location.href =
          process.env.NEXT_PUBLIC_API_URL + "/auth/twitter";
        console.error("error", error);
      }
    };
    handleClick();
  }, []);

  //get all form
  useEffect(() => {
    console.log("i am in");

    handleClick();
  }, [status1, page,category]);

  //total page count
  useEffect(() => {
    function roundUpIfDecimalGreaterThanZero(value) {
      const totalProducts = value; // Replace with your total product count
      const itemsPerPage = 15;

      const totalPages = totalProducts / itemsPerPage;

      if (totalPages % 1 > 0) {
        setPageCount(Math.ceil(totalPages));
      } else {
        setPageCount(Math.floor(totalPages));
      }
    }
    roundUpIfDecimalGreaterThanZero(allData?.total);
  }, [allData]);

  console.log("pagecount", pageCount);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/form/get-all-forms?page=${page}&status=${status1}&category=${category}`,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("response", response);
      const { status } = response;
      console.log("check", response);
      if (status == 200) {
        if (typeof response?.data == "string") {
          router.push("/");
        } else {
          setAllData(response?.data);
        }
      }
    } catch (error) {
      router.push("/");
      console.error("error", error);
    }
  };

//update click

const UpdateClick =async(id)=>{
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/form/click`,
      {user_id:id,
      clicked:true
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log("response status clicked", response);

    const { status } = response;

    if (status == 200) {
      handleClick();
    }
  } catch (error) {
    //   router.push("/");
    console.error("error", error);
  }


}






  //change status of the users
  const changeStatus = async (id, status) => {
    console.log(id, status);
    const params = {
      user_id: id,
      status: status,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/status/set`,
        params,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("response", response);

      const { status } = response;

      if (status == 200) {
        handleClick();
      }
    } catch (error) {
      //   router.push("/");
      console.error("error", error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin - Fada</title>
      </Head>
      {allData?.data?.length > 0 && (
        <div className="min-h-screen lg:p-10 p-5 ">
          <table className=" table-auto    w-full min-w-[1000px] rounded-xl overflow-hidden border border-black">
            <caption class="caption-top lg:text-lg  font-display bg-primary   text-white">
              <div className="flex justify-between items-center px-5">
                <div>
                  <Link href="/">
                    {" "}
                    <i className="hover:text-red-700 duration-300 fa-solid fa-house"></i>{" "}
                  </Link>{" "}
                </div>

                <div className="flex items-center flex-col w-full py-3 font-bold">
                  <p className="w-fit">All Fada Forms </p>
                  <p className="w-fit mt-2">Total: {allData?.total}</p>
                </div>
                <div></div>
              </div>
            </caption>
            <thead className="text-sm  bg-white break-words">
              <tr>
                <th className="border-b p-4  pl-4 text-start  w-1/12">
                  User Name
                </th>
                <th className="border-b p-4  pl-4 text-start  w-[4%]">Links</th>
             
                <th className="border-b py-4   text-start  w-1/12 ">User ID</th>

                <th className="border-b p-4   text-start   w-2/12">
                  Polygon Address
                </th>
                <th className="border-b p-4   text-start   w-1/12">
                  Discord ID
                </th>
                <th className="border-b py-4  text-start   w-1/12">






                <select
                    name="category"
                    onChange={async(e) => {
                      setPage(1);
                      setCategory(e.target.value);
                    }}
                    className={`h-full appearance-none focus:outline-none border-none text-sm w-full text-start focus:ring-0  bg-transparent `}
                  >
                    <option value="" className="w-fit   text-black">
                      Category: All
                    </option>
                    <option className="p-4" value="artist">
                        Artist
                      </option>
                      <option className="p-4" value="developer">
                        Developer
                      </option>
                      <option className="p-4" value="founder">
                        Founder
                      </option>
                      <option className="p-4" value="influencer">
                        Influencer
                      </option>
                      <option className="p-4" value="grinder">
                        Grinder
                      </option>
                      <option className="p-4" value="meme_poster">
                        Meme Poster
                      </option>
                      <option className="p-4" value="content_creator">
                        Content Creator
                      </option>
                      <option
                        className="p-4"
                        value="community_manager/moderator"
                      >
                        Community Manager/Moderator
                      </option>
                      <option className="p-4" value="alpha_caller">
                        Alpha Caller
                      </option>
                      <option className="p-4" value="space_host">
                        Space Host
                      </option>

                      <option className="p-4" value="others">
                        Others...
                      </option>
                  </select>


















                </th>
                <th className="border-b py-4   text-start   w-1/12">
                  <select
                    name="category"
                    onChange={(e) => {
                      setPage(1);
                      setStatus(e.target.value);
                    }}
                    className={`h-full appearance-none focus:outline-none border-none text-sm w-full text-start focus:ring-0  bg-transparent `}
                  >
                    <option value="" className="w-fit   text-black">
                      Status: All
                    </option>
                    <option value="Accepted" className="w-fit  text-black">
                      Status: Accepted
                    </option>
                    <option value="Applied" className="w-fit  text-black">
                      Status: Applied
                    </option>
                    <option value="Rejected" className="w-fit  text-black">
                      Status: Rejected
                    </option>
                  </select>
                </th>
                <th className="border-b p-4  pl-4 text-start  w-[4%]">Clicked</th>
                <th className="border-b p-4  pl-4 text-start   w-1/12">
                  Tweeted
                </th>
                <th className="border-b p-4  pl-4 text-start   w-1/12" title="How long you have been in the space?">
                  Duration
                </th>
                <th className="border-b p-4  pl-4 text-start   w-2/12">
                  Help Text
                </th>
              </tr>
            </thead>
            <tbody className="border-b p-2">
              {allData?.data?.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="border p-2 pl-4 break-all	">
                 {item?.username}
                  </td>
                  <td className=" p-2 border-b h-full break-all	">
                    <div className="flex flex-col gap-2">
                      {item?.links[0] && (
                        <a
                          href={item?.links[0]}
                          className="hover:text-red-700 duration-300 text-sm"
                          target="_black"
                        >
                          Link 1
                        </a>
                      )}
                      {item?.links[1] && (
                        <a
                          href={item?.links[1]}
                          className="hover:text-red-700 duration-300 text-sm"
                          target="_black"
                        >
                          Link 2
                        </a>
                      )}
                      {item?.links[2] && (
                        <a
                          href={item?.links[2]}
                          className="hover:text-red-700 duration-300 text-sm"
                          target="_black"
                        >
                          Link 3
                        </a>
                      )}
                    </div>
                  </td>
                  
                  <td className="border p-2 break-all">{item?.user_id}</td>
                  <td className="border p-2 break-all">
                    {item?.polygon_address}
                  </td>
                  <td className="border p-2 break-all">{item?.discord_id}</td>
                  <td className="border p-2 break-all ">{item?.category}</td>

                  <td className="border p-2 break-all ">
                    <select
                      name="category"
                      value={status1 || item?.user_status}
                      onChange={(e) => {
                        changeStatus(item?.user_id, e.target.value);
                      }}
                      className={`h-full appearance-none focus:outline-none border-none text-sm w-full text-start focus:ring-0  bg-transparent `}
                    >
                      <option value="Rejected" className="w-fit   text-black">
                        Rejected
                      </option>
                      <option value="Accepted" className="w-fit  text-black">
                        Accepted
                      </option>
                      <option value="Applied" className="w-fit  text-black">
                        Applied
                      </option>
                    </select>
                  </td>



                  <td className="border p-2 break-all">

                  <label className="relative inline-flex items-center cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onClick={() => UpdateClick(item?.user_id)}
                        checked={item?.clicked == true}
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-[22px] after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>



                    
                  </td>






                  <td className="border p-2  break-all">
                    {item?.tweetSent ? "true" : "false"}
                  </td>
                  <td className="border  p-2  break-all">
                    {item?.how_long}
                  </td>
                  <td className="border p-2  break-words ">{item?.help}</td>
                </tr>
              ))}
            </tbody>
          </table>





          <div className=" flex justify-center lg:py-10 py-5">
                      <Pagination
                        boundaryCount={5}
                        siblingCount={6}
                        page={page}
                        count={pageCount}
                        shape="rounded"
                        size="large"
                        onChange={async (event, pageNumber) => {
                          setPage(pageNumber);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      />
                    </div>



          {/* <div className="flex justify-center gap-4 mt-10 text-white lg:text-xl text-lg ">
            {page > 1 && (
              <button
                onClick={() => {
                  setPage(page - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-primary w-1/4 rounded-xl hover:bg-primary2 duration-300 py-3"
              >
                Previous
              </button>
            )}
            {page > 1 && (
              <p className="w-40 flex justify-center items-center bg-white border text-black">
                {page}
              </p>
            )}

            {pageCount > page && (
              <button
                onClick={() => {
                  setPage(page + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-primary rounded-xl hover:bg-primary2 duration-300 w-1/4 py-3"
              >
                Next
              </button>
            )}
          </div> */}
        </div>
      )}
    </>
  );
}
