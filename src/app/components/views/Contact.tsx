import Image from "next/image";
import SectionHeaders from "../layouts/sectionHeaders/SectionHeaders";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="text-center my-8" id="contact">
      <SectionHeaders subHeader="Contact Us" mainHeader="Get in touch" />
      <div className="mt-8 mx-auto flex justify-center">
        <Link href={"https://wa.me/+6281335282802"} className="text-4xl ">
          <div className="flex items-center gap-6 rounded-3xl px-6 py-4 bg-green-500 hover:bg-green-400 transition-all duration-300 sm1:px-4 sm1:py-3 sm0:px-4 sm0:py-2 sm0:gap-3">
            <div className="rounded-[100%] border border-gray overflow-hidden w-20 sm1:w-[4.3rem] sm0:w-[4.1rem]">
              <Image
                src={"/images/profileWhatsapp.png"}
                alt="whatsapp"
                className="object-cover w-full"
                width={50}
                height={50}
              ></Image>
            </div>
            <div className="flex flex-col items-start justify-between">
              <h1 className="font-bold text-2xl text-neutral-800 -tracking-[.5px] mt-1 sm1:text-xl sm0:text-lg">
                Warung Jujugan
              </h1>
              <h2 className="text-gray text-[1.1rem] sm1:text-base sm0:text-sm">
                Continue To Whatsapp
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
