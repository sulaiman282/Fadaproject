import React, { useEffect, useRef, useState } from "react";

import Head from "next/head";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";
import Confetti from "confetti-js";

export default function Status() {
  const router = useRouter();
  const [statusTest, setStatusText] = useState("");

  const [time1, setTime1] = useState(true);

  const confettiRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("i am in");
      setTime1(false);
    }, 6000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (confettiRef.current) {
      const confetti = new Confetti({
        target: confettiRef.current,
        max: 200,
        size: 1,
        animate: true,
      });
      confetti.render();
      return () => confetti.clear();
    }
  }, [time1, statusTest]);

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
        console.log("response", response);

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
      console.log("response", response);

      const { status } = response;

      if (status == 200) {
        setStatusText(response?.data);
      } else {
        router.push("/status");
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  console.log(statusTest);
  return (
    <>
      <Head>
        <title>Status - Fada</title>
      </Head>

      <div
        className={`relative overflow-hidden h-screen flex items-center  bg-[url('/bg1.jpg')] bg-center bg-cover bg-no-repeat bg-static bg-fixed signup`}
      >
        <div className="container-sk w-full">
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

                <div className="mt-5 h-12 w-full">
                  <ReactTypingEffect
                    speed={100}
                    eraseSpeed={10}
                    eraseDelay={10000}
                    className="text-center font-display text-primary  tracking-wider lg:text-xl md:text-base  text-lg "
                    text={["See your status below fayden."]}
                  />
                </div>

                <div className="flex items-center flex-col gap-6 mt-5">
                  {time1 == true && (
                    <div>
                      {statusTest == "Accepted" && (
                        <div className="fixed top-0 left-0 w-full">
                          <canvas ref={confettiRef} id="confetti-canvas" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col justify-center gap-4">
                    <p className="text-xl md:text-2xl ">Application Status </p>

                    {statusTest && statusTest == "Accepted" && (
                      <p className="py-2 text-center font-bold px-3 rounded-xl lg:text-2xl text-xl bg-green-700 text-white">
                        {statusTest}
                      </p>
                    )}
                    {statusTest && statusTest == "Applied" && (
                      <p className="py-2 text-center font-bold px-3 rounded-xl lg:text-2xl text-xl bg-yellow-700 text-black">
                        {statusTest}
                      </p>
                    )}
                    {statusTest && statusTest == "Rejected" && (
                      <p className="py-2 text-center font-bold px-3 rounded-xl lg:text-2xl text-xl bg-red-700 text-white">
                        {statusTest}
                      </p>
                    )}
                    {statusTest && statusTest == "Not Applied" && (
                      <p className="py-2 text-center font-bold px-3 rounded-xl lg:text-2xl text-xl bg-white text-primary">
                        {statusTest}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-2xl gap-6 flex justify-center mt-10 text-white">
                  <a href="https://twitter.com/ProjectFADA" target="_black">
                    <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer hover:bg-primary2 duration-300">
                      <i className="fa-brands fa-twitter absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2" />
                    </div>
                  </a>

                  <a href="https://discord.gg/WFnEbNGNDU" target="_black">
                    <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer hover:bg-primary2 duration-300">
                      <i className="fa-brands fa-discord absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 " />
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/projectfada/"
                    target="_black"
                  >
                    <div className="relative h-10 w-10 rounded-md bg-primary cursor-pointer  hover:bg-primary2 duration-300">
                      <i className="fa-brands fa-instagram absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 " />
                    </div>
                  </a>
                </div>

                <div className="mt-10 flex justify-center gap-2 items-center hover:text-primary2 duration-300">
                  <Link className="" href="/">
                    <i className="fa-solid fa-house" /> Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
