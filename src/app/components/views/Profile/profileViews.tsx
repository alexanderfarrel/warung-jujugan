import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Profile from "../../icons/profile";
import Input from "../../ui/Input";
import useWindowWidth from "@/services/windowWidth/services";

export default function ProfileView({ session, update, status }: any) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCharUsername, setTotalCharUsername] = useState(0);
  const [totalCharEmail, setTotalCharEmail] = useState(0);
  const userImage = session?.user?.image;
  const windowWidth = useWindowWidth();

  useEffect(() => {
    setTotalCharUsername(session?.user?.username?.length);
    setTotalCharEmail(session?.user?.email?.length);

    if (status === "authenticated") {
      setUsername(session?.user?.username);
    }
  }, [status, session]);

  if (status === "unauthenticated") {
    return redirect("/auth/login");
  }

  const handleInputUsername = (e: any) => {
    setUsername(encodeURIComponent(e.target.value));
    setTotalCharUsername(e.target.value.length);
    if (e.target.value.length >= 15) {
      setError("Max 15 Char");
    } else {
      setError("");
    }
  };

  const handleUserInfo = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const result = await fetch("/api/profile/username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          email: session?.user?.email,
          username: decodeURIComponent(username),
        }),
      });
      const res = await result.json();
      if (res) {
        await update({
          ...session,
          user: {
            ...session?.user,
            username: decodeURIComponent(username),
          },
        });
        setIsLoading(false);
        resolve(true);
      } else {
        setIsLoading(false);
        reject(false);
      }
    });
    toast.promise(savingPromise, {
      loading: "Menyimpan...",
      success: "Berhasil Update Profile",
      error: "kayanya ada yang error",
    });
  };

  const handleChangeAvatar = async (e: any) => {
    setAvatarLoading(true);
    const oldImage = session?.user?.imageName;
    const image = e.target.files[0];

    if (image == null) {
      setAvatarLoading(false);
      return toast.error("kayanya ada yang error");
    }
    if (image.size > 1_000_000) {
      setAvatarLoading(false);
      return toast.error("Maximal image 1 MB aja..", {
        icon: "😣",
      });
    }
    if (oldImage === image.name + session?.user?.email) {
      setAvatarLoading(false);
      return toast("Avatar tidak ada perubahan");
    }

    const data = new FormData();
    data.append("image", image);
    data.append("name", image.name + session?.user?.email);

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const result = await fetch("/api/profile/image", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: data,
        });
        const res = await result.json();
        if (oldImage) {
          await fetch("/api/profile/image", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({
              oldImage: oldImage,
            }),
          });
        }
        setAvatarLoading(false);
        if (res.status) {
          await update({
            ...session,
            user: {
              ...session?.user,
              imageName: image.name + session?.user?.email,
              image: res.url,
            },
          });
          resolve(res);
        } else {
          reject();
        }
      } finally {
        location.reload();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Mengupload avatar..",
      success: "Avatar Berhasil Diganti",
      error: "kayanya ada yang error",
    });
  };
  return (
    <section className="mt-20">
      <h1 className="text-center text-primary text-4xl font-bold mb-4 sm0:text-3xl">
        Profile
      </h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-2 items-center sm0:flex-col">
          <div className="p-2 rounded-2xl max-w-40 flex flex-col items-center">
            {userImage ? (
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden mb-2">
                <Image
                  src={userImage}
                  width={100}
                  height={100}
                  alt="Avatar"
                  className="w-full h-full object-cover object-center absolute"
                ></Image>
              </div>
            ) : (
              <Profile classname="w-full" />
            )}
            <label htmlFor="changeAvatar">
              <motion.input
                disabled={isLoading}
                type="file"
                className="hidden"
                id="changeAvatar"
                onChange={(e: any) => handleChangeAvatar(e)}
              />
              <motion.span className="bloxk border text-primary font-medium border-primary px-2 py-1 rounded-xl cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
                {avatarLoading ? "Loading..." : "Change Avatar"}
              </motion.span>
            </label>
          </div>
          <form
            className={`w-full ${
              windowWidth < 530 && windowWidth > 400
                ? "px-20"
                : windowWidth <= 400 && "px-10"
            }`}
            onSubmit={handleUserInfo}
          >
            <Input
              type="username"
              onChange={handleInputUsername}
              totalChar={totalCharUsername}
              name="username"
              id="username"
              maxLength={15}
              label="Username"
              className="mb-2"
              spellCheck={false}
              error={error}
              defaultValue={session?.user?.username}
            />
            <Input
              type="email"
              name="email"
              totalChar={totalCharEmail}
              defaultValue={session?.user?.email}
              id="email"
              className="mb-3"
              label="Email"
              disabled
            />
            <motion.button
              type="submit"
              className="w-full bg-primary py-1 text-white font-medium hover:text-primary rounded-xl hover:bg-white hover:shadow-inset transition-all duration-300"
              disabled={isLoading}
              whileTap={{ scale: 0.85 }}
            >
              {isLoading ? "Saving..." : "Save"}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
