"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthLayout from "../../components/layouts/authLayouts";
import Input from "@/app/components/ui/Input";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import DarkModeButton from "@/app/components/ui/DarkModeButton";

export default function LoginPage({ searchParams }: any) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalChar, setTotalChar] = useState(0);
  const [totalCharPassword, setTotalCharPassword] = useState(0);
  const callbackUrl = searchParams.callbackUrl || "/";

  const handleFormSubmit = async (e: any) => {
    const savingPromise = new Promise(async (resolve, reject) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: e.target.email.value,
          password: e.target.password.value,
          callbackUrl,
        });
        if (!res?.error) {
          setIsLoading(false);
          resolve(true);
          e.target.reset(), setIsLoading(false), push(callbackUrl);
        } else {
          if (res.status === 401) {
            reject();
            setIsLoading(false);
          }
        }
      } catch (err) {
        reject();
        setIsLoading(false);
        console.log(err);
      }
    });
    toast.promise(savingPromise, {
      loading: "Loading",
      success: "Login Success",
      error: "Email Atau Password Salah",
    });
  };
  return (
    <>
      <header className="fixed top-0 left-0 right-0 py-3 px-4 shadow-custom flex justify-between dark:bg-dark bg-white z-20">
        <Link
          className="text-primary font-semibold text-2xl sm1:text-lg sm0:text-lg"
          href="/"
        >
          Warung Jujugan
        </Link>
        <DarkModeButton />
      </header>
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <AuthLayout
          searchParams={searchParams}
          title="Login"
          link="/auth/register"
          linkText="Disini"
          subLinkText="Belum punya akun? Register"
        >
          <form
            className="block max-w-xs w-full mx-auto"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="email"
              name="email"
              id="email"
              spellCheck={false}
              label="Email"
              required
              onChange={(e) => setTotalChar(e.target.value.length)}
              className="mb-3"
              totalChar={totalChar}
            ></Input>
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              onChange={(e) => setTotalCharPassword(e.target.value.length)}
              totalChar={totalCharPassword}
            />
            <button
              className="w-full bg-secondary text-white font-bold rounded-xl mt-5 py-2 transition-all duration-200 hover:bg-secondary/80"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="my-4 text-center text-neutral-500 dark:text-neutral-200">
            or login with provider
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            type="button"
            className="max-w-xs w-full flex py-2 justify-center items-center bg-neutral-100 rounded-xl hover:bg-white/80 transition-all duration-200"
          >
            {" "}
            <svg
              enable-background="new 0 0 48 48"
              height="30"
              viewBox="0 0 48 48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                fill="#ffc107"
              />
              <path
                d="m6.306 14.691 6.571 4.819c1.778-4.402 6.084-7.51 11.123-7.51 3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-7.682 0-14.344 4.337-17.694 10.691z"
                fill="#ff3d00"
              />
              <path
                d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.521-4.504 2.43-7.219 2.43-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025c3.31 6.477 10.032 10.921 17.805 10.921z"
                fill="#4caf50"
              />
              <path
                d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238c-.438.398 6.591-4.807 6.591-14.807 0-1.341-.138-2.65-.389-3.917z"
                fill="#1976d2"
              />
            </svg>
            Login with google
          </button>
        </AuthLayout>
      </motion.div>
    </>
  );
}
