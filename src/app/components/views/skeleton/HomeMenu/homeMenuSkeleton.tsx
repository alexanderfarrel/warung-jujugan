import FilterOrderHeading from "@/app/components/layouts/filter/filterOrderHeading";
import MenuItem from "@/app/components/layouts/menu/MenuItem";

export default function HomeMenuSkeleton() {
  return (
    <>
      <FilterOrderHeading skeleton={true}></FilterOrderHeading>
      <div className="grid grid-cols-3 gap-6 sm1:grid-cols-2 sm0:grid-cols-2">
        <MenuItem skeleton={true}></MenuItem>
        <MenuItem skeleton={true}></MenuItem>
        <MenuItem skeleton={true}></MenuItem>
        <MenuItem skeleton={true}></MenuItem>
        <MenuItem skeleton={true}></MenuItem>
        <MenuItem skeleton={true}></MenuItem>
      </div>
    </>
  );
}
