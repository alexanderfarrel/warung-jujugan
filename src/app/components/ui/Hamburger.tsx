import { motion } from "framer-motion";

export default function HamburgerButton({ setOpenMotion, openMotion }: any) {
  return (
    <button
      onClick={() => setOpenMotion(!openMotion)}
      className="z-50 text-white cursor-pointer"
    >
      <svg width={23} height={23} viewBox="0 0 23 23">
        <motion.path
          strokeWidth={2}
          stroke={"white"}
          strokeLinecap={"round"}
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        ></motion.path>
        <motion.path
          strokeWidth={2}
          stroke={"white"}
          strokeLinecap={"round"}
          d="M 5 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        ></motion.path>
        <motion.path
          strokeWidth={2}
          stroke={"white"}
          strokeLinecap={"round"}
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        ></motion.path>
      </svg>
    </button>
  );
}
