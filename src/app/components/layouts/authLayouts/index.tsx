import Link from "next/link";
type propTypes = {
  children: React.ReactNode;
  title: string;
  link: string;
  linkText: string;
  subLinkText?: string;
  searchParams?: any;
};

export default function AuthLayout(props: propTypes) {
  const { children, title, link, linkText, subLinkText } = props;
  return (
    <>
      <section className="mt-20 flex flex-col items-center">
        <h1 className="text-center text-secondary text-4xl font-bold mb-4 sm1:text-3xl sm0:text-3xl">
          {title}
        </h1>
        {children}
        <h3 className="text-center mt-4 font-medium dark:text-neutral-100">
          {subLinkText}
          <Link
            href={link}
            className="text-primary font-semibold hover:text-primary/80"
          >
            {" " + linkText}
          </Link>
        </h3>
      </section>
    </>
  );
}
