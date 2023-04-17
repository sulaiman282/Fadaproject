import React, { useEffect,useState } from "react";
import Head from "next/head";
import { Formik } from "formik";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
export default function Logout() {
  
    const [isTrue, setisTrue] = useState(false);

    
    const router = useRouter();


    useEffect(() => {
     
      handleClick();
    }, []);

    const handleClick = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`,
            {
              withCredentials: true,
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
          console.log("response", response);
  
          const { status } = response;
  
          if (status == 200) {
            setisTrue(true);
          }
        } catch (error) {
        }
      };

    const logout = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
            {
              withCredentials: true,
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
          console.log("response logout", response);
  
          const { status } = response;
  
          if (status == 200) {
          setisTrue(false);
           router.push("/");
           handleClick();
          }
        } catch (error) {
        }
      };



  return (
    <div className="">
        {isTrue && (
            <div className="py-1 bg-primary flex justify-center">
            <p className="w-fit text-2xl text-white hover:text-red-700 cursor-pointer duration-300" onClick={()=>logout()}>Logout</p>
            </div>
        )}
    </div>
  )
}
