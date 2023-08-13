import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";
import { search } from "../public/icons";
import styles from "../styles/search.module.css";
import emptyImg from "../public/media/empty.jpg";
import Image from "next/image";
import Buttons from "../components/utils/buttons";
import ProductCard from "../components/cards/product";

export default function Page() {
  return (
    <>
      <CustomHead
        title={"Premium Pipe | Search"}
        desc={""}
        canonical={"/search"}
      />
      <Layout>
        <IntroSection location="Результат поиска" />
        <section className="section">
          <div className="box">
            <form className={styles.input_wrapper}>
              <input type="text" required className={styles.input} name="q" />
              <button type="submit">{search}</button>
            </form>
            <EmptyComponent />
          </div>
        </section>
      </Layout>
    </>
  );
}

const EmptyComponent = () => {
  return (
    <div className={styles.empty_wrapper}>
      <h4 style={{ textAlign: "center" }} className={styles.custom_title}>
        По вашему запросу ничего не найдено
      </h4>
      <Image src={emptyImg} alt="empty image" />
    </div>
  );
};

const ContentComponent = () => {
  return (
    <div className={`section_inner ${styles.content_wrapper}`}>
      <div className="section_inner_top">
        <h4 className={styles.custom_title}>По вашему запросу найдено</h4>
        <Buttons variant="arrow" prevClass="" nextClass="" />
      </div>
      <div className="products_container"></div>
    </div>
  );
};
