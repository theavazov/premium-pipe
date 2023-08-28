import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ModalContext } from "../../store/modal";
import Modal from "../utils/modal";
import { ICategory } from "../../server/interfaces";

export default function Layout({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: ICategory[];
}) {
  const { pathname } = useRouter();
  const { isModal } = useContext(ModalContext);

  return (
    <div className="wrapper">
      {pathname === "/" ? (
        <Header variant="light" categories={categories} />
      ) : pathname === "/categories/[slug]" ? (
        <Header variant="light" categories={categories} />
      ) : pathname === "/news/[slug]" ? (
        <Header variant="light" categories={categories} />
      ) : (
        <Header variant="dark" categories={categories} />
      )}
      <main>{children}</main>
      <Footer />
      {isModal ? <Modal /> : null}
    </div>
  );
}
