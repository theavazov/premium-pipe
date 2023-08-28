import Layout from "../components/layout";
import { CustomHead } from "../components/layout/head";
import IntroSection from "../components/universal/intro";
import { search } from "../public/icons";
import styles from "../styles/search.module.css";
import emptyImg from "../public/media/empty.jpg";
import Image from "next/image";
import Buttons from "../components/utils/buttons";
import ProductCard from "../components/cards/product";
import { getCategories, searchProducts } from "../server/api";
import { useContext, useState } from "react";
import { ICategory, IProduct } from "../server/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { FormContext } from "../store/form";
import { TranslationsContext } from "../store/translations";

export default function Page(categories: ICategory[]) {
  const { products, setProducts, query, setQuery } = useContext(FormContext);
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={`Premium Pipe | ${t["main.search"]}`}
        desc={""}
        canonical={"/search"}
      />
      <Layout categories={categories}>
        <IntroSection location={t["main.search_result"]} />
        <section className="section">
          <div className={`box ${styles.minibox_mb}`}>
            <form
              className={styles.input_wrapper}
              onSubmit={(e) => {
                e.preventDefault();
                searchProducts(query)
                  .then((res) => setProducts(res.results))
                  .catch((e) => console.log(e));
              }}
            >
              <input
                type="text"
                required
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">{search}</button>
            </form>
            {products.length > 0 ? (
              <ContentComponent products={products} />
            ) : (
              <EmptyComponent />
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

const EmptyComponent = () => {
  const { t } = useContext(TranslationsContext);
  return (
    <div className={styles.empty_wrapper}>
      <h4 style={{ textAlign: "center" }} className={styles.custom_title}>
        {t["main.nothing_found"]}
      </h4>
      <Image src={emptyImg} alt="empty image" />
    </div>
  );
};

const ContentComponent = ({ products }: { products: IProduct[] }) => {
  const { t } = useContext(TranslationsContext);
  return (
    <div className={`section_inner ${styles.content_wrapper}`}>
      <div className="section_inner_top">
        <h4 className={styles.custom_title}>{t["main.thing_found"]}</h4>
        <Buttons
          variant="arrow"
          prevClass="prev-product"
          nextClass="next-product"
        />
      </div>
      <div>
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation={{ prevEl: ".prev-product", nextEl: ".next-product" }}
          speed={800}
          loop={true}
          breakpoints={{
            0: {
              spaceBetween: 16,
              slidesPerView: 1,
            },
            580: {
              spaceBetween: 16,
              slidesPerView: 2.4,
            },
            880: {
              spaceBetween: 16,
              slidesPerView: 3.4,
            },
            1200: {
              spaceBetween: 16,
              slidesPerView: 4,
            },
            1450: {
              spaceBetween: 24,
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
export async function getServerSideProps(ctx: any) {
  const categories = await getCategories(ctx.locale);
  return {
    props: { categories },
  };
}
