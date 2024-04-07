export default function Spinner({
  widthHeight,
  primary = false,
}: {
  widthHeight: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`${widthHeight} border-4 ${
        primary
          ? "border-r-primary border-l-primary border-b-primary border-t-transparent "
          : "border-r-white border-l-white border-b-white border-t-transparent "
      } rounded-full animate-spin mx-auto`}
    ></div>
  );
}
