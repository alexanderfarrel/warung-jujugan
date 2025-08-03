import { motion } from "framer-motion";

export default function FilterOrderHeading({
  infoType,
  skeleton = false,
  small = false,
  animate = true,
}: {
  infoType?: string;
  skeleton?: boolean;
  small?: boolean;
  animate?: boolean;
}) {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: animate ? (skeleton ? 0 : 1.5) : 0 }}
        className="w-full bg-primary h-1 rounded-full"
      />
      {skeleton ? (
        <div className="w-44 h-4 mx-2 bg-neutral-300 rounded-full animate-pulse"></div>
      ) : (
        <motion.p
          initial={{ opacity: animate ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animate ? 0.5 : 0, delay: 0.4 }}
          className={`font-medium px-2 dark:text-bright whitespace-nowrap ${
            small ? "text-sm" : "text-base"
          }`}
        >
          {infoType}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: animate ? (skeleton ? 0 : 1.5) : 0 }}
        className="w-full bg-primary h-1 rounded-full"
      />
    </div>
  );
}
