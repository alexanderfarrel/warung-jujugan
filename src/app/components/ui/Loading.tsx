export default function Loading({ small = false }: { small?: boolean }) {
  return (
    <>
      <p
        className={`${small ? "text-[12px]" : "text-[15px]"} dark:text-bright`}
      >
        Loading
      </p>
      <span
        className={`animate-fadeInLoop ${
          small ? "text-[12px]" : "text-[15px]"
        } dark:text-bright`}
      >
        {" "}
        .
      </span>
      <span
        className={`animate-fadeInLoop2 ${
          small ? "text-[12px]" : "text-[15px]"
        } dark:text-bright`}
      >
        .
      </span>
      <span
        className={`animate-fadeInLoop3 ${
          small ? "text-[12px]" : "text-[15px]"
        } dark:text-bright`}
      >
        .
      </span>
    </>
  );
}
