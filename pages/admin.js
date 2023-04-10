import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Admin() {
  const [allData, setAllData] = useState(null);

  const [status1, setStatus] = useState("");
  const [statusChange, setStatusChange] = useState(null);

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
          { withCredentials: true }
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
    setPage(1);
    handleClick();
  }, [status1,page]);


  //total page count
  useEffect(() => {
    function roundUpIfDecimalGreaterThanZero(value) {


      const totalProducts = value; // Replace with your total product count
      const itemsPerPage = 15;
      
      const totalPages = totalProducts / itemsPerPage;


      if (totalPages % 1 > 0) {
         setPageCount(Math.ceil(totalPages))
      } else {
        setPageCount(Math.floor(totalPages))
      }
    }
    roundUpIfDecimalGreaterThanZero(allData?.total);
  }, [allData]);


console.log("pagecount",pageCount)

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/form/get-all-forms?page=${page}&status=${status1}`,
        { withCredentials: true }
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

      <div className="min-h-screen lg:p-10 p-5 ">
        <table className=" table-auto    w-full min-w-[1000px] rounded-xl overflow-hidden border border-black">
          <caption class="caption-top lg:text-lg  font-display bg-primary   text-white">
            <div className="flex items-center flex-col w-full py-3 font-bold">
              <p className="w-fit">All Fada Forms </p>
              <p className="w-fit mt-2">Total: {allData?.total}</p>
            </div>
          </caption>
          <thead className="text-sm  bg-white break-words">
            <tr>
              <th className="border-b p-4  pl-4 text-start  w-2/12">
                User Name
              </th>
              <th className="border-b p-4  pl-4 text-start  w-1/12">
                User Picture
              </th>
              <th className="border-b py-4   text-start  w-1/12 ">User ID</th>

              <th className="border-b p-4   text-start   w-2/12">
                Polygon Address
              </th>
              <th className="border-b p-4   text-start   w-1/12">Discord ID</th>
              <th className="border-b py-4  text-start   w-1/12">Category</th>
              <th className="border-b py-4   text-start   w-1/12">
                <select
                  name="category"
                  onChange={(e) => {
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

              <th className="border-b p-4  pl-4 text-start   w-1/12">
                Tweeted
              </th>
              <th className="border-b p-4  pl-4 text-start   w-2/12">
                Help Text
              </th>
            </tr>
          </thead>
          <tbody className="border-b p-2">
            {allData?.data?.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="border p-2 pl-4 break-all	">{item?.username}</td>
                <td className="border p-2 break-all	">
                  <img
                    src={
                      item?.image
                        ? process.env.NEXT_PUBLIC_API_URL +
                          `/images/` +
                          item?.image
                        : `/noimage.png`
                    }
                    alt="Logo"
                    className="object-contain h-20 w-20"
                  />
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
                <td className="border p-2  break-all">
                  {item?.tweetSent ? "true" : "false"}
                </td>
                <td className="border p-2  break-all ">{item?.help}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-4 mt-10 text-white lg:text-xl text-lg ">
     {
         page > 1 && (
          <button onClick={()=>{setPage(page-1)}} className="bg-primary w-1/4 hover:bg-primary2 duration-300 py-3">
          Previous
        </button>

         )
     }
         {
          pageCount > page  && (

            <button onClick={()=>{setPage(page+1)}} className="bg-primary hover:bg-primary2 duration-300 w-1/4 py-3">
            Next
          </button>

          )
         }
         
        </div>
      </div>
    </>
  );
}
