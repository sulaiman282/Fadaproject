import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import ReactTypingEffect from "react-typing-effect";
export default function status() {
  return (
    <>
      <Head>
        <title>Success - Fada</title>
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
                    className="text-center flex justify-center font-display text-primary  tracking-wider lg:text-xl md:text-base  text-lg "
                    text={["Thank you for submitting the form"]}
                  />
                </div>

                <div className="flex items-center flex-col gap-6 mt-5">
                  <div className="flex flex-col justify-center gap-4">
                    <p className="text-xl md:text-2xl text-center text-primary font-bold bg-white/50 rounded-md p-2">
                      Form Submitted Successfully.
                    </p>
                  </div>
                </div>
                <p className="text-center lg:text-lg md:text-base text-sm text-primary mt-12">
                  Join our community for more updates
                </p>
<p className="text-center text-lg lg:text-2xl animate-bounce mt-3 text-primary2 "><i className="fa-solid fa-angles-down"></i></p>
                <div className="text-2xl gap-6 flex justify-center  text-white">
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
