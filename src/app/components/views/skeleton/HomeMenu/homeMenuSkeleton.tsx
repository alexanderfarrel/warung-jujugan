import FilterOrderHeading from "@/app/components/layouts/filter/filterOrderHeading";
import MenuItem from "@/app/components/layouts/menu/MenuItem";
import { motion } from "framer-motion";
export default function HomeMenuSkeleton() {
  return (
    <>
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <FilterOrderHeading skeleton={true}></FilterOrderHeading>
        <div className="grid grid-cols-3 gap-6 sm1:grid-cols-2 sm0:grid-cols-2">
          <MenuItem skeleton={true}></MenuItem>
          <MenuItem skeleton={true}></MenuItem>
          <MenuItem skeleton={true}></MenuItem>
          <MenuItem skeleton={true}></MenuItem>
          <MenuItem skeleton={true}></MenuItem>
          <MenuItem skeleton={true}></MenuItem>
        </div>
      </motion.div>
    </>
  );
}
