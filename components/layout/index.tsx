import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  return (
    <div className="wrapper">
      {pathname === "/" ? (
        <Header variant="light" />
      ) : pathname === "/categories/[slug]" ? (
        <Header variant="light" />
      ) : pathname === "/news/[slug]" ? (
        <Header variant="light" />
      ) : (
        <Header variant="dark" />
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
