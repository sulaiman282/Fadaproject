import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Form() {
  const router = useRouter();

  const [isShowingToast, setisShowingToast] = useState(false);
  const [userData, setUserData] = useState(null);

  //check if user is not authenticated
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
        // console.log("response", response);

        const { status } = response;

        if (status == 200) {
          getStatus();
        }
      } catch (error) {
        window.location.href =
          process.env.NEXT_PUBLIC_API_URL + "/auth/twitter";
        console.error("error", error);
      }
    };
    handleClick();
  }, []);

  //get user current status
  const getStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/status/get`,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      // console.log("response", response);

      const { status } = response;
      console.log("user current status", response?.data);
      if (status == 200 && response?.data == "Not Applied") {
      } else if (status == 200 && response?.data == "Applied") {
        userAllData();
      } else {
        router.push("/status");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  //get user allData status
  const userAllData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/form/get-form`,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const { status } = response;
      if (status == 200) {
        setUserData(response?.data);
      }
      console.log("user data", response);
    } catch (error) {
      console.error("error", error);
    }
  };

  //Submit form
  const submitform = async (values) => {
    console.log(values);
    var data1 = {
      category: values?.category,
      discord_id: values?.discord_id,
      polygon_address: values?.polygon_address,
      how_long: values?.time_in_space,
      help: values.help_nft_text,
      tweetSent: values.tweet,
      links: values.links,
    };
    if (values.reffer1?.length > 0) {
      data1.nominee1 = values.reffer1;
    }
    if (values.reffer2?.length > 0) {
      data1.nominee2 = values.reffer2;
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data1));
   
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true, // assuming you want to send cookies with the request
    };
    const data = JSON.stringify(formData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/form/submit`,
        formData,
        config
      );

      const { status } = response;
      console.log("submit response", response);
      if (status === 200) {
        toast.success("Form submitted!");
        userAllData();
        router.push("/success");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <Head>
        <title>Fada</title>
      </Head>
      <div className=" min-h-screen min-w-screen p-5 lg:p-10  bg-[url('/bg1.jpg')] bg-cover bg-center lg:bg-cover bg-no-repeat bg-static bg-fixed bg-transparent">
        <Formik
          enableReinitialize
          initialValues={{
            category: userData?.category || "",
            discord_id: userData?.discord_id || "",
            polygon_address: userData?.polygon_address || "",
            time_in_space: userData?.how_long || "",
            help_nft_text: userData?.help || "",
            reffer1: userData?.nominee1 || "",
            reffer2: userData?.nominee2 || "",
            tweet: userData?.tweetSent || false,
            links: userData?.links || [],
          }}
          validate={(values) => {
            const errors = {};
            if (!values.category) {
              errors.category = "Required";
            }
            if (!values.discord_id) {
              errors.discord_id = "Required";
            }
            if (!values.polygon_address) {
              errors.polygon_address = "Required";
            }
            if (!values.time_in_space) {
              errors.time_in_space = "Required";
            }
            if (!values.help_nft_text) {
              errors.help_nft_text = "Required";
            }
            else if(values.help_nft_text?.length >250) {
              errors.help_nft_text = "Max 250 characters.";
            }


            if (!values.links[0]) {
              errors.links = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            submitform(values);
            setSubmitting(false);
            console.log(values)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              onSubmit={handleSubmit}
              className="  flex flex-col items-center gap-6 "
            >
              <div className="border-2 border-primary lg:w-2/3 xl:w-1/2 w-full rounded-md bg-white p-5  lg:px-10  flex flex-col gap-6">
                <div className=" flex justify-end  items-center hover:text-primary2 duration-300">
                  <Link className="" href="/">
                    <i className="fa-solid fa-house pr-2" /> Home
                  </Link>
                </div>

                <Image
                  placeholder="blur"
                  src="/logoform.png"
                  width={300}
                  height={300}
                  blurDataURL="/blur.png"
                  alt="Logo"
                  className="object-contain h-32  mx-auto  "
                />

                <div className="flex gap-4 lg:flex-row flex-col">
                  <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                    <p className="text-xl ">CHOOSE YOUR CATEGORY</p>
                    <select
                      name="category"
                      id="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="px-4 bg-white border-2 appearance-none rounded-md h-10  text-gray-900 text-lg lg:text-xl"
                    >
                      <option className="p-4" value="">
                        Select Category
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
                      <option className="p-4" value="community_manager/moderator">
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
                    <span className="ml-5 tracking-widest text-xs text-red-700">
                      {errors.category && touched.category && errors.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                    <p className="text-xl ">INSERT DISCORD ID</p>
                    <input
                      type="text"
                      name="discord_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="ex:9nFwxPkTCx"
                      value={values.discord_id}
                      className="p-4  h-10 bg-white border-2 rounded-md text-gray-900  placeholder:text-gray-500 placeholder:text-xl"
                    />
                    <span className="ml-5 tracking-widest text-xs text-red-700">
                      {errors.discord_id &&
                        touched.discord_id &&
                        errors.discord_id}
                    </span>
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-4">
                  <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                    <p className="text-xl ">INSERT POLYGON (MATIC) ADDRESS:</p>
                    <input
                      type="text"
                      name="polygon_address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.polygon_address}
                      placeholder="ex: 0xB2846e2291342483TTBAa19322E140e2Db48EFd2"
                      className="p-4 rounded-md h-10 border-2 bg-white w-full text-gray-900 placeholder:text-gray-500 placeholder:text-xl"
                    />
                    <span className="ml-5 tracking-widest text-xs text-red-700">
                      {errors.polygon_address &&
                        touched.polygon_address &&
                        errors.polygon_address}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 lg:w-1/2 w-full">
                    <p className="text-xl ">
                      HOW LONG YOU HAVE BEEN IN THE SPACE?
                    </p>
                    <select
                      name="time_in_space"
                      value={values.time_in_space}
                      id="cars"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-white px-4 rounded-md appearance-none border-2 h-10 w-full text-gray-900 text-lg lg:text-xl"
                    >
                      <option value="" className="p-4">
                        Insert Answer .....
                      </option>
                      <option className="p-4" value="Less than a year">
                        Less than a year
                      </option>
                      <option className="p-4" value="3">
                        1 year
                      </option>
                      <option className="p-4" value="4">
                        2+ years
                      </option>
                    </select>
                    <span className="ml-5 tracking-widest text-xs text-red-700">
                      {errors.time_in_space &&
                        touched.time_in_space &&
                        errors.time_in_space}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 ">
                  <p className="text-xl capitalize">
                    HOW DID YOU HELP FADA OR THE NFT ECOSYSTEM TO GROW?
                  </p>
                  <textarea
                    rows="6"
                    type="text"
                    name="help_nft_text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.help_nft_text}
                    placeholder="Insert Answer ....."
                    className="p-4 rounded-md border-2   text-gray-900  bg-white placeholder:text-gray-500 placeholder:text-xl"
                    cols=""
                  />
                  <span className="ml-5 tracking-widest text-xs text-red-700">
                    {errors.help_nft_text &&
                      touched.help_nft_text &&
                      errors.help_nft_text}
                  </span>
                </div>

                <div className="flex flex-col ">
                  <p className="text-xl capitalize">INSERT LINKS THAT SUPPORT YOUR APPLICATION</p>
                  <input
                    type="text"
                    name="links"
                    onChange={(e) => {
                      values.links[0] = e.target.value;
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.links[0]}
                    placeholder="Link 1"
                    className="p-4 rounded-md h-10 mt-3 border-2 bg-white w-full placeholder:text-gray-500 placeholder:text-xl pl-10"
                  />

                  <span className="ml-5 mt-2 tracking-widest text-xs text-red-700">
                    {errors.links && touched.links && errors.links}
                  </span>

                  <input
                    type="text"
                    name="links"
                    onChange={(e) => {
                      values.links[1] = e.target.value;
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.links[1]}
                    placeholder="Link 2"
                    className="p-4 rounded-md h-10  mt-3 border-2 bg-white w-full placeholder:text-gray-500 placeholder:text-xl pl-10"
                  />

                  <input
                    type="text"
                    name="links"
                    onChange={(e) => {
                      values.links[2] = e.target.value;
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.links[2]}
                    placeholder="Link 3"
                    className="p-4 rounded-md h-10  mt-3 border-2 bg-white w-full placeholder:text-gray-500 placeholder:text-xl pl-10"
                  />
                </div>

                <div className="flex flex-col gap-4 ">
                  <p className="text-xl ">
                    Increase your chances of getting a FADA PASS by nominating
                    two people to submit this form and inserting their Twitter
                    handles <span className="font-bold">(optional)</span>.
                  </p>
                  <div className="flex md:flex-row lg:justify-between lg:items-center flex-col lg:gap-4 gap-2">
                    <div className="w-full lg:w-1/2 ">
                      <div className="relative">
                        <input
                          type="text"
                          name="reffer1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.reffer1}
                          placeholder="@twitter handle"
                          className="p-4 rounded-md h-10  border-2 bg-white w-full placeholder:text-gray-500 placeholder:text-xl pl-10"
                        />
                        {values.reffer1 && (
                          <span className="absolute top-1/2 left-5 lg:text-xl text-lg -translate-y-1/2">
                            @
                          </span>
                        )}
                      </div>
                      <span className="ml-5 tracking-widest text-xs text-red-700">
                        {errors.reffer1 && touched.reffer1 && errors.reffer1}
                      </span>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <div className="relative">
                        <input
                          type="text"
                          name="reffer2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.reffer2}
                          placeholder="@twitter handle"
                          className="p-4 rounded-md h-10  border-2 bg-white w-full placeholder:text-gray-500 placeholder:text-xl pl-10"
                        />
                        {values.reffer2 && (
                          <span className="absolute top-1/2 left-5 lg:text-xl text-lg -translate-y-1/2">
                            @
                          </span>
                        )}
                      </div>
                      <span className="ml-5 tracking-widest text-xs text-red-700">
                        {errors.reffer2 && touched.reffer2 && errors.reffer2}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 ">
                  {/* Here */}
                  <a
                    onClick={() => {
                      values.tweet = true;
                    }}
                    className="bg-[#1DA1F2] text-lg lg:text-xl text-white font-bold w-40 text-center py-3 rounded-full"

                    href={`https://twitter.com/intent/tweet?text=I'm%20excited%20to%20share%20that%20I've%20just%20completed%20the%20form%20for%20@ProjectFADA%20!%20%0A%0A%0AI%20nominate%20${
                      values.reffer1 ? `@` + values.reffer1 : ""
                    }%20and%20${
                      values.reffer2 ? `@` + values.reffer2 : ""
                    }%20to%20fill%20it.%20It's%20your%20turn%20to%20Be%20A%20Fayden.`}

                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tweet
                  </a>
                </div>
                <p className="text-md lg:text-lg text-red-700">
                  Make sure all the information provided are accurate before
                  submitting your application
                </p>

                <div className="flex justify-center gap-4 ">
                  {/* Here */}

                  <button className="text-xl lg:text-2xl rounded-full bg-primary hover:bg-primary2  w-40 text-center py-2 text-white">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
