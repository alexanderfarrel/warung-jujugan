import SectionHeaders from "../layouts/sectionHeaders/SectionHeaders";

export default function About() {
  return (
    <section className="text-center my-16" id="about">
      <SectionHeaders subHeader="About Us" mainHeader="Our Story" />
      <div className="text-gray max-w-2xl mx-auto mt-4 flex flex-col gap-4">
        <p className="dark:text-neutral-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa amet
          exercitationem, repellendus placeat ad similique laboriosam?
          Aspernatur voluptatem, debitis illo, itaque autem in minus iusto sed
          accusamus quasi ducimus ipsam.
        </p>
        <p className="dark:text-neutral-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa amet
          exercitationem, repellendus placeat ad similique laboriosam?
          Aspernatur voluptatem, debitis illo, itaque autem in minus iusto sed
          accusamus quasi ducimus ipsam.
        </p>
      </div>
    </section>
  );
}
