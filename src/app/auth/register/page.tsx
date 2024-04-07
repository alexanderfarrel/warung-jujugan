"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../components/layouts/authLayouts";
import Input from "@/app/components/ui/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import DarkModeButton from "@/app/components/ui/DarkModeButton";

export default function RegisterPage() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputUsername, setInputUsername] = useState(0);
  const [inputEmail, setInputEmail] = useState(0);
  const [inputPassword, setInputPassword] = useState(0);

  const handleInputUsername = (e: any) => {
    setInputUsername(e.target.value.length);
    if (e.target.value.length === 15) {
      setError("Max 15 Char");
    } else {
      setError("");
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const savingPromise = new Promise(async (resolve, reject) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      const form = e.currentTarget;
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.value,
          username: form.username.value,
          password: form.password.value,
        }),
      });
      if (res.status === 200) {
        (e.target as HTMLFormElement).reset();
        resolve(true);
        setIsLoading(false);
        push("/auth/login");
      } else {
        reject();
        setIsLoading(false);
      }
    });
    toast.promise(savingPromise, {
      loading: "Loading",
      success: "Register Success",
      error: "Email Already Exist",
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
          title="Register"
          link="/auth/login"
          linkText="Disini"
          subLinkText="Sudah Punya Akun? Login"
        >
          <form className="max-w-xs w-full" onSubmit={handleFormSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              required
              id="email"
              className="mb-3"
              onChange={(e) => {
                setInputEmail(e.target.value.length);
              }}
              totalChar={inputEmail}
            />
            <Input
              label="Username"
              type="text"
              name="username"
              required
              maxLength={15}
              onChange={handleInputUsername}
              totalChar={inputUsername}
              error={error}
              id="username"
              className="mb-3"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              id="password"
              required
              onChange={(e) => {
                setInputPassword(e.target.value.length);
              }}
              totalChar={inputPassword}
            />
            <Button
              type="submit"
              className="w-full bg-secondary text-white font-bold rounded-xl mt-5 hover:bg-secondary/80 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </form>
        </AuthLayout>
      </motion.div>
    </>
  );
}
