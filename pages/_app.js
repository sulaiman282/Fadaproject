import "@/styles/globals.css";
import Head from "next/head";
import localFont from 'next/font/local';
import Logout from "@/components/Logout";
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import Link from "next/link";


export default function MyApp({ Component, pageProps, router }) {

  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  NProgress.configure({ showSpinner: false });

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  return (
    <div>
         <Toaster
            toastOptions={{
              duration: 3000,
            }}
          />
      <Component {...pageProps} />
      <Logout/>
      <Link className="absolute top-1 right-3" href="/admin"><i className="text-white text-xs hover:text-red-700 duration-300 fa-solid fa-gear"></i></Link>
    </div>
  );
}
