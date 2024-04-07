export default function SectionHeaders({
  subHeader,
  mainHeader,
}: {
  subHeader: string;
  mainHeader: string;
}) {
  return (
    <>
      <h3 className="uppercase text-gray font-semibold leading-5 text-lg dark:text-bright">
        {mainHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">{subHeader}</h2>
    </>
  );
}
