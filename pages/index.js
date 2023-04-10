import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";
export default function Index() {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`,
        { withCredentials: true }
      );
      console.log("response", response);

      const { status } = response;

      if (status == 200) {
        console.log("User Logged in");
        router.push("/form");
      }
    } catch (error) {
      window.location.href = process.env.NEXT_PUBLIC_API_URL + "/auth/twitter";

      console.error("error", error);
    }
  };

  console.log("local", process.env.NEXT_PUBLIC_API_URL);
  return (
    <>
      <Head>
        <title>Fada</title>
      </Head>

      <div
        className={`relative overflow-hidden h-screen flex items-center  bg-[url('/bg1.jpg')] bg-center bg-cover bg-no-repeat bg-static bg-fixed signup`}
      >
        <div className="container-sk w-full" >
          <div className=" rotate-border  bg-white w-full mx-auto md:w-2/3 lg:w-1/2 xl:w-1/3   p-1  ">
            <div className="z-10 rounded-lg bg-[url('/bg1.jpg')]  bg-center bg-cover bg-no-repeat bg-static bg-fixed    w-full h-full">
              <div className="md:p-14 p-5  rounded-lg backdrop-blur-xl bg-white/50 w-full">
                <div className="flex justify-center w-full select-none pointer-events-none">
                  <Image
                    placeholder="blur"
                    src="/logo.png"
                    width={200}
                    height={200}
                    alt="Logo"
                    blurDataURL="/logo.png"
                    className="object-contain  w-32 "
                  />
                </div>

                <div className="mt-5 h-20  w-full">
                  <ReactTypingEffect
                    speed={100}
                    eraseSpeed={10}
                    eraseDelay={10000}
                    className="text-center font-display text-primary  tracking-wider lg:text-xl md:text-base  text-lg "
                    text={[
                     " Be a Fayden by applying for the FADA PASS .",
                    ]}
                  />
                </div>

                <div className="flex items-center flex-col gap-6 mt-5">
                  <button
                    onClick={() => {
                      handleClick();
                    }}
                    className="lg:text-xl uppercase tracking-wider bg-primary rounded-xl w-full py-3 text-white font-bold   hover:bg-primary2 duration-300"
                  >
                    Apply Now
                  </button>
                  <Link href="/status" className="w-full">
                    <button className="lg:text-xl uppercase tracking-wider bg-primary rounded-xl w-full py-3 text-white font-bold   hover:bg-primary2 duration-300">
                      Check Status
                    </button>
                  </Link>
                </div>

                <div className="text-2xl gap-6 flex justify-center mt-10 text-white">
                  <a
                    href="https://www.instagram.com/projectfada/"
                    target="_black"
                  >
                    <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer  hover:bg-primary2 duration-300">
                      <i className="fa-brands fa-instagram absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 " />
                    </div>
                  </a>

                  <a
                    href="https://discord.com/invite/NVRJcD9nah"
                    target="_black"
                  >
                    <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer hover:bg-primary2 duration-300">
                      <i className="fa-brands fa-discord absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 " />
                    </div>
                  </a>

                  <a href="https://twitter.com/ProjectFADA" target="_black">
                    <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer hover:bg-primary2 duration-300">
                      <i className="fa-brands fa-twitter absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" h-screen w-screen p-5 lg:p-10 xl:p-20 bg-[url('/bg.png')] bg-cover bg-center lg:bg-cover bg-no-repeat bg-static bg-fixed bg-transparent">
        <div className="h-full w-full  flex flex-col justify-between items-center gap-10 overflow-y-auto">
          <Image
            placeholder="blur"
            src="/logo.png"
            width={300}
            height={300}
            blurDataURL="/blur.png"
            alt="Logo"
            className="object-contain h-40 w-40"
          />

          <div className="flex items-center flex-col gap-6">
            <button
              onClick={() => {
                handleClick();
              }}
              className="lg:text-xl uppercase tracking-wider bg-primary rounded-xl w-60 py-6 text-white font-bold   hover:text-red-700 duration-300"
            >
              Apply Now
            </button>
            <Link href="/status">
              <button className="uppercase  bg-primary rounded-xl lg:text-xl tracking-wider  w-60 py-6 text-white font-bold  hover:text-red-700 duration-300">
                Check Status
              </button>
            </Link>
          </div>

          <div className="text-2xl gap-6 flex text-white">
            <a href="https://www.instagram.com/projectfada/" target="_black">
              <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer  hover:text-red-700 duration-300">
                <i className="fa-brands fa-instagram absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 " />
              </div>
            </a>

            <a href="https://discord.com/invite/NVRJcD9nah" target="_black">
              <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer hover:text-red-700 duration-300">
                <i className="fa-brands fa-discord absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 " />
              </div>
            </a>

            <a href="https://twitter.com/ProjectFADA" target="_black">
              <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer hover:text-red-700 duration-300">
                <i className="fa-brands fa-twitter absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2" />
              </div>
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
}
